import { Router } from 'express';

import { pool } from '../db/index.js';
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
    this.router.post('/', this.createEmployee);
    this.router.delete('/:employeeId', this.deleteEmployee);
    this.router.use('/positions', employeePositionController.router);
  }

  async getAllEmployees(req, res, next) {
    try {
      const result = await pool.query('SELECT * from pracownik_komplet_informacji');

      const employees = translateResultRows(result.rows);

      res.json({ employees });
    } catch(err) {
      console.error(err);
      next(err);
    }
  }

  async createEmployee(req, res, next) {
    try {
      const client = await pool.connect();
      const { positionId, email, password } = req.body.employeeData;
  
      const personalData = await personalDataService.createPersonalData(req.body.personalData, client);
  
    
      const hiredEmployee = await authService.registerEmployee({
        personalDataId: personalData.id,
        positionId,
        email,
        password,
      }, client);
  
      res.json({ 
        createdEmployee: {
          ...hiredEmployee,
          ...personalData,
        } 
      });
    } catch(err) {
      console.error(err);
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
      console.error(err);
    }
  }
}


export default new EmployeeController();