import { Router } from 'express';

import { pool } from '../db/index.js'
import { translateResultRow, translateResultRows } from '../utils/variableNamesTranslator.js'


class BloodCollectionPointController {
  constructor() {
    this.router = Router({ mergeParams: true });
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.getAllPoints);
    this.router.post('/', this.createPoint);
    this.router.delete('/:pointId', this.deletePoint);
  }

  async getAllPoints(req, res, next) {
    try {
      const result = await pool.query('SELECT * FROM punkt_pobran');
      const points = translateResultRows(result.rows);

      res.json(points);
    } catch(err) {
      console.error(err);
      next(err);
    }
  }

  async createPoint(req, res, next) {
    const { city, address, laboratoryId } = req.body;

    try {
      const result = await pool.query(
        `INSERT INTO punkt_pobran (miasto, adres, laboratorium_id) 
        VALUES ($1, $2, $3) 
        RETURNING *`, 
        [city, address, laboratoryId]
      );

      const createdPoint = translateResultRow(result.rows[0]);
      res.json(createdPoint);
    } catch(err) {
      console.error(err);
      next(err);
    }
  }

  async deletePoint(req, res, next) {
    const pointId = parseInt(req.params.pointId);
  
    try {
      const result = await pool.query(
        `DELETE FROM punkt_pobran 
        WHERE id = $1 
        RETURNING id`, 
        [pointId]
      );

      res.json(result.rows[0].id);
    } catch(err) {
      console.error(err);
      next(err);
    }
  }
}

export default new BloodCollectionPointController();