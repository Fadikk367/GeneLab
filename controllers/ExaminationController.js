import { Router } from 'express';

import { pool } from '../db/index.js';
import examinationCategoryController from './ExaminationCategoryController.js';
import { translateResultRow, translateResultRows } from '../utils/variableNamesTranslator.js';


class ExaminationController {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.getAllExaminations);
    this.router.post('/', this.addExamination);
    this.router.delete('/:examinationId', this.deleteExamination);
    this.router.use('/categories', examinationCategoryController.router);
  }

  async getAllExaminations(req, res, next) {
    try {
      const result = await pool.query(`SELECT * FROM badanie`);

      console.log(result.rows);

      const examinations = translateResultRows(result.rows);
      console.log(examinations);

      res.json(examinations);
    } catch(err) {
      console.error(err);
      nmext(err);
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
      type
    } = req.body;
  
    try {
      const result = await pool.query(
        `INSERT INTO badanie 
        (nazwa, wartosc_min, wartosc_max, jednostka, cena, material, rodzaj) 
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *`, 
        [name, minValue, maxValue, unit, price, material, type]
      );

      const addedExamination = translateResultRow(result.rows[0]);
  
      res.json(addedExamination);
    } catch(err) {
      console.error(err);
      next(err);
    }
  }

  async deleteExamination(req, res, next) {
    const examinationId = req.params.examinationId;
  
    try {
      const result = await pool.query(
        'DELETE FROM badanie WHERE id = $1 RETURNING id, nazwa', 
        [examinationId]
      );
  
      const deletedExamination = translateResultRow(result.rows[0]);

      res.json(deletedExamination);
    } catch(err) {
      console.error(err);
    }
  }
}


export default new ExaminationController();