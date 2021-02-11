import { Router } from 'express';

import { pool } from '../db/index.js'
import { authUser } from '../middlewares/authUser.js';
import bloodCollectionPointController from './BloodCollectionPointController.js'
import orderedExaminationsService from '../services/orderedExaminationsService.js';
import { translateResultRow, translateResultRows } from '../utils/variableNamesTranslator.js'


class DiagnosticLaboratoryController {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.getAllLaboratories);
    this.router.post('/', authUser, this.createLaboratory);
    this.router.delete('/:laboratoryId', authUser, this.deleteLaboratory);
    this.router.get('/examinations', authUser, this.getPendingExaminations);

    this.router.use('/collection-points', bloodCollectionPointController.router);
  }

  async getAllLaboratories(req, res, next) {
    try {
      const result = await pool.query(`
        SELECT * FROM laboratorium_diagnostyczne LAB 
        JOIN adres ON adres.id = LAB.adres_id
      `);
      const laboratories = translateResultRows(result.rows);

      res.json(laboratories);
    } catch(err) {
      console.error(err);
      next(err);
    }
  }

  async createLaboratory(req, res, next) {
    const { city, street, number, numberOfDevices } = req.body;
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

      const resultLaboratory = await client.query(
        `INSERT INTO laboratorium_diagnostyczne (adres_id, liczba_aparatow) 
        VALUES ($1, $2) 
        RETURNING *`, 
        [id, numberOfDevices]
      );
      await client.query('COMMIT');

      const createdLaboratory = translateResultRow(resultLaboratory.rows[0]);

      res.json({ id: createdLaboratory.id, city, street, number, numberOfDevices });
    } catch(err) {
      client.query('ROLLBACK');
      next(err);
    } finally {
      client.release();
    }
  }

  async deleteLaboratory(req, res, next) {
    const laboratoryId = parseInt(req.params.laboratoryId);
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const result = await client.query(
        `DELETE FROM laboratorium_diagnostyczne 
        WHERE id = $1 
        RETURNING id`, 
        [laboratoryId]
      );

      const addressId = result.rows[0].adres_id;

      await client.query(
        `DELETE FROM adres 
        WHERE id = $1 
        RETURNING id`, 
        [addressId]
      );

      client.query('COMMIT');
      res.json(laboratoryId);
    } catch(err) {
      client.query('ROLLBACK');
      next(err);
    } finally {
      client.release();
    }
  }

  async getPendingExaminations(req, res, next) {
    const laboratoryId = req.user.laboratoryId;

    try {
      const pendingExaminations = await orderedExaminationsService.getByLaboratoryId(laboratoryId);
      res.json(pendingExaminations);
    } catch(err) {
      console.error(err);
      next(err);
    }
  }
}

export default new DiagnosticLaboratoryController();