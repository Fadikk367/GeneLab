import { Router } from 'express';

import { pool } from '../db/index.js';
import { authUser } from '../middlewares/authUser.js';
import { translateResultRow, translateResultRows } from '../utils/variableNamesTranslator.js'


class BloodCollectionPointController {
  constructor() {
    this.router = Router({ mergeParams: true });
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.getAllPoints);
    this.router.post('/', authUser, this.createPoint);
    this.router.delete('/:pointId', authUser, this.deletePoint);
  }

  async getAllPoints(req, res, next) {
    try {
      const result = await pool.query('SELECT PP.id, PP.laboratorium_id, adres.miasto, adres.ulica, adres.numer FROM punkt_pobran PP JOIN adres ON adres.id = PP.adres_id');
      const points = translateResultRows(result.rows);

      res.json(points);
    } catch(err) {
      console.error(err);
      next(err);
    }
  }

  async createPoint(req, res, next) {
    const { city, street, number, laboratoryId } = req.body;
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const resultAddress = await client.query(
        `INSERT INTO adres (miasto, ulica, numer) 
        VALUES ($1, $2, $3) 
        RETURNING *`, 
        [city, street, number]
      );

      const { id } = translateResultRow(resultAddress.rows[0]);

      const resultPoint = await client.query(
        `INSERT INTO punkt_pobran (adres_id, laboratorium_id) 
        VALUES ($1, $2) 
        RETURNING *`, 
        [id, laboratoryId]
      );
      
      await client.query('COMMIT');

      const createdPoint = translateResultRow(resultPoint.rows[0]);

      res.json({ id: createdPoint.id, city, street, number, laboratoryId });
    } catch(err) {
      client.query('ROLLBACK');
      next(err);
    } finally {
      client.release();
    }
  }

  async deletePoint(req, res, next) {
    const pointId = parseInt(req.params.pointId);
  
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const result = await client.query(
        `DELETE FROM punkt_pobran 
        WHERE id = $1 
        RETURNING id`, 
        [pointId]
      );

      const addressId = result.rows[0].adres_id;

      await client.query(
        `DELETE FROM adres 
        WHERE id = $1 
        RETURNING id`, 
        [addressId]
      );

      client.query('COMMIT');
      res.json(pointId);
    } catch(err) {
      client.query('ROLLBACK');
      next(err);
    } finally {
      client.release();
    }
  }
}

export default new BloodCollectionPointController();