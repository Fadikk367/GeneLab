import { Router } from 'express';

import { pool } from '../db/index.js';
import { translateResultRow, translateResultRows } from '../utils/variableNamesTranslator.js';


class EmployeePositionController {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.getAllEmployeePositions);
    this.router.post('/', this.addEmployeePosition);
    this.router.put('/:positionId', this.updateEmployeePosition);
    this.router.delete('/:positionId', this.deleteEmployeePosition);
  }

  async getAllEmployeePositions(req, res, next) {
    try {
      const result = await pool.query('SELECT id, nazwa, pensja, opis FROM stanowisko');

      const employeePositions = translateResultRows(result.rows);
      res.json({ employeePositions: employeePositions });
    } catch(err) {
      console.error(err);
      next(err);
    }
  }

  async addEmployeePosition(req, res, next) {
    try {
      console.log(req.body);
      const { positionName, positionSalary, positionDescription } = req.body;
    
      const result = await pool.query(
        `INSERT INTO stanowisko (nazwa, pensja, opis) 
        VALUES ($1, $2, $3) 
        RETURNING id, nazwa, pensja, opis`, 
        [positionName, positionSalary, positionDescription]
      );

      const createdEmployeePosition = translateResultRow(result.rows[0]);

      res.json({ createdEmployeePosition });
    } catch(err) {
      console.error(err);
    }
  }
  
  async updateEmployeePosition (req, res, next) {
    const positionId = req.params.positionId;
    const positionNSalary = req.body.positionSalary;
  
    try {
      const result = await pool.query(
        `UPDATE stanowisko SET pensja = $1 
        WHERE id = $2 
        RETURNING id, nazwa, pensja, opis`, 
        [positionNSalary, positionId]
      );

      const updatedEmployeePosition = translateResultRow(result.rows[0]);

      res.json({ updatedEmployeePosition });
    } catch(err) {
      console.error(err);
      next(err);
    }
  }

  async deleteEmployeePosition (req, res, next) {
    const positionId = req.params.positionId;
  
    try {
      const result = await pool.query(
        `DELETE FROM stanowisko 
        WHERE id = $1 
        RETURNING id, nazwa as name`, 
        [positionId]
      );

      const deletedEmployeePosition = translateResultRow(result.rows[0]);

      res.json({ deletedEmployeePosition });
    } catch(err) {
      console.error(err);
      next(err);
    }
  }
}


export default new EmployeePositionController();