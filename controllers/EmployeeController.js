import { Router } from 'express';

import { pool } from '../db/index.js';
import { authUser } from '../middlewares/authUser.js';
import personalDataService from '../services/personalDataService.js';
import authService from '../services/authService.js';
import { translateResultRow, translateResultRows } from '../utils/variableNamesTranslator.js';
import employeePositionController from './EmployeePositionController.js';


class EmployeeController {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.getAllEmployees);
    this.router.post('/', authUser, this.createEmployee);
    this.router.put('/:employeeId', authUser, this.updateEmployee);
    this.router.delete('/:employeeId', authUser, this.deleteEmployee);
    
    this.router.use('/positions', employeePositionController.router);
  }

  async getAllEmployees(req, res, next) {
    try {
      const result = await pool.query('SELECT * from pracownik_komplet_informacji');

      const employees = translateResultRows(result.rows);

      res.json({ employees });
    } catch(err) {
      next(err);
    }
  }

  async createEmployee(req, res, next) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      const { positionId, email, password, laboratoryId } = req.body.employeeData;
  
      const personalData = await personalDataService.createPersonalData(req.body.personalData, client);
  
    
      const hiredEmployee = await authService.registerEmployee({
        personalDataId: personalData.id,
        positionId,
        laboratoryId,
        email,
        password,
      }, client);

      await client.query('COMMIT');
  
      res.json({ 
        createdEmployee: {
          ...hiredEmployee,
          ...personalData,
        } 
      });
    } catch(err) {
      client.query('ROLLBACK');
      next(err);
    } finally {
      client.release();
    }
  }

  async updateEmployee(req, res, next) {
    const employeeId = req.params.employeeId;
    const bonus = req.body.bonus;
  
    try {
      const result = await pool.query(
        'UPDATE pracownik SET premia = $1 WHERE id = $2 RETURNING id, premia', 
        [bonus, employeeId]
      );
  
      const updatedEmployee = translateResultRow(result.rows[0]);
  
      res.json(updatedEmployee);
    } catch(err) {
      next(err);
    }
  }

  async deleteEmployee(req, res, next) {
    const employeeId = req.params.employeeId;
  
    try {
      const deletedEmployee = await pool.query(
        'DELETE FROM pracownik WHERE id = $1 RETURNING dane_osobowe_id as personalDataId', 
        [employeeId]
      ).rows[0];
  
      personalDataService.deletePersonalData(deleteEmployee.personaldataid);
  
      res.json({ deletedEmployee });
    } catch(err) {
      next(err);
    }
  }
}


export default new EmployeeController();