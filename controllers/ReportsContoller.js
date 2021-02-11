import { Router } from 'express';

import { pool } from '../db/index.js';
import { authUser } from '../middlewares/authUser.js';
import { translateResultRows } from '../utils/variableNamesTranslator.js';


class ReportsContoller {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/payments', authUser, this.generatePaymentsReport);
    this.router.get('/employees', authUser, this.generateEmployeesReport);
    this.router.get('/laboratories', authUser, this.generateLaboratoriesReport);
  }

  async generatePaymentsReport(req, res, next) {
    try {
      const result = await pool.query('SELECT * FROM platnosc');
      const payments = translateResultRows(result.rows);

      res.json(payments);
    } catch(err) {
      console.log(err);
      next(err);
    }
  }

  async generateEmployeesReport(req, res, next) {
    try {
      const result = await pool.query('SELECT * FROM wyniki_pracownikow');
      const employeesResults = translateResultRows(result.rows);

      res.json(employeesResults);
    } catch(err) {
      console.log(err);
      next(err);
    }
  }

  async generateLaboratoriesReport(req, res, next) {
    try {
      const result = await pool.query('SELECT * FROM podsumowanie_laboratoriow');
      const laboratoriesSummary = translateResultRows(result.rows);

      res.json(laboratoriesSummary);
    } catch(err) {
      console.log(err);
      next(err);
    }
  }
}


export default new ReportsContoller();