import { Router } from 'express';

import { pool } from '../db/index.js';
import { authUser } from '../middlewares/authUser.js';
import examinationCategoryController from './ExaminationCategoryController.js';
import { translateResultRow, translateResultRows } from '../utils/variableNamesTranslator.js';


class ExaminationController {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.getAllExaminations);
    this.router.get('/category/:categoryId', this.getByCategory);
    this.router.post('/', authUser, this.addExamination);
    this.router.delete('/:examinationId', authUser, this.deleteExamination);
    this.router.post('/results/:examinationId', authUser, this.createExaminationResult);

    this.router.use('/categories', examinationCategoryController.router);
  }

  async getAllExaminations(req, res, next) {
    try {
      const result = await pool.query('SELECT * FROM badanie');

      const examinations = translateResultRows(result.rows);

      res.json(examinations);
    } catch(err) {
      console.error(err);
      nmext(err);
    }
  }

  async getByCategory(req, res, next) {
    const categoryId = parseInt(req.params.categoryId);
    const page = parseInt(req.query.page);
    const items = parseInt(req.query.items);

    try {
      const result = await pool.query(
        `SELECT * FROM badanie_kategoria BAD_KAT
        JOIN badanie BAD ON BAD_KAT.badanie_id = BAD.id
        WHERE BAD_KAT.kategoria_id = $1
        ORDER BY BAD.nazwa
        LIMIT $2
        OFFSET $3`,
        [categoryId, items, (page-1)*items]
      );

      const examinations = translateResultRows(result.rows);

      res.json(examinations);
    } catch(err) {
      console.error(err);
      next(err);
    }
  }

  async addExamination(req, res, next) {
    const { 
      name, 
      minValue, 
      maxValue, 
      unit, 
      price, 
      material,
      type,
      categoryIds,
    } = req.body;
  
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const result = await client.query(
        `INSERT INTO badanie 
        (nazwa, wartosc_min, wartosc_max, jednostka, cena, material, rodzaj) 
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *`, 
        [name, minValue, maxValue, unit, price, material, type]
      );

      const addedExamination = translateResultRow(result.rows[0]);

      for (const categoryId of categoryIds) {
        await client.query(
          `INSERT INTO badanie_kategoria (badanie_id, kategoria_id) 
          VALUES ($1, $2)`,
          [addedExamination.id, categoryId]
        );
      }
      client.query('COMMIT');
  
      res.json(addedExamination);
    } catch(err) {
      console.error(err);
      client.query('ROLLBACK');
      next(err);
    } finally {
      client.release();
    }
  }

  async deleteExamination(req, res, next) {
    const examinationId = req.params.examinationId;
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      await client.query('DELETE FROM badanie_kategoria WHERE badanie_id = $1', [examinationId]);
      await client.query('DELETE FROM badanie WHERE id = $1', [examinationId]);
  
      await client.query('COMMIT');

      res.json(examinationId);
    } catch(err) {
      client.query('ROLLBACK');
      next(err);
    } finally {
      client.release();
    }
  }

  async createExaminationResult(req, res, next) {
    const examinationId = parseInt(req.params.examinationId);
    const { result } = req.body;
  
    try {
      await pool.query(
        `INSERT INTO wynik_badania (data, wartosc, zlecenie_badania_id, pracownik_id)
        VALUES ($1, $2, $3, $4)`, 
        [new Date(), result, examinationId, req.user.id]
      );
  
      res.json(examinationId);
    } catch(err) {
      console.error(err);
      next(err);
    }
  }
}


export default new ExaminationController();