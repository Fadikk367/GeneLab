import { Router } from "express";
import { pool } from "../db/index.js";
import { translateResultRows, translateResultRow } from "../utils/variableNamesTranslator.js";


class ExaminationCategoryController {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.getAllCategories);
    this.router.post('/', this.createCategory);
    this.router.delete('/:categoryId', this.deleteCategory);
    this.router.post('/:categoryId', this.addExaminationToCategory);
  }

  async getAllCategories(req, res, next) {
    try {
      const result = await pool.query('SELECT * FROM kategoria_badan');
      const categoires = translateResultRows(result.rows);
      res.json(categoires);
    } catch(err) {
      console.error(err);
      next(err);
    }
  }

  async createCategory(req, res, next) {
    const { name, description } = req.body;

    try {
      const result = await pool.query(
        `INSERT INTO kategoria_badan (nazwa, opis) 
         VALUES ($1, $2)
         RETURNING *`,
        [name, description]
      );

      const cretedCategory = translateResultRow(result.rows[0]);
      res.json(cretedCategory);
    } catch(err) {
      console.error(err);
      next(err);
    }
  }

  async deleteCategory(req, res, next) {
    const categoryId = parseInt(req.params.categoryId);
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      await client.query('DELETE FROM kategoria_badan WHERE id = $1', [categoryId]);
      await client.query('DELETE FROM badanie_kategoria WHERE kategoria_id = $1', [categoryId]);

      await client.query('COMMIT');
      res.json(categoryId);
    } catch(err) {
      console.error(err);
      client.query('ROLLBACK');
      next(err);
    } finally {
      client.release();
    }
  }

  async addExaminationToCategory(req, res, next) {
    const categoryId = parseInt(req.params);
    const { examinationId } = req.body;

    try {
      const result = await pool.query(
        `INSERT INTO badanie_kategoria (badanie_id, kategoria_id) 
        VALUES ($1, $2) 
        RETURINING *`, 
        [examinationId, categoryId]
      );

      const createdCategoryExaminationBinding = translateResultRow(result.rows[0]);
      res.json(createdCategoryExaminationBinding);
    } catch(err) {
      console.error(err);
      next(err);
    }
  }
}

export default new ExaminationCategoryController();