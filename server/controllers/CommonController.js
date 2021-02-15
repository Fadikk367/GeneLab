import { Router } from 'express';

import { pool } from '../db/index.js';
import { translateResultRow, translateResultRows } from '../utils/variableNamesTranslator.js';


class CommonController {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/materials', this.getAllMaterials);
    this.router.get('/types', this.getAllExaminationTypes);
  }

  async getAllMaterials(req, res, next) {
    try {
      const result = await pool.query(`SELECT * FROM materialy_biologiczne`);

      const materials = translateResultRows(result.rows);
      
      const materialNames = materials.map(material => material.name);

      res.json(materialNames);
    } catch(err) {
      console.error(err);
      nmext(err);
    }
  }

  async getAllExaminationTypes(req, res, next) {
    try {
      const result = await pool.query(`SELECT * FROM rodzaje_badan`);

      const examinationTypes = translateResultRows(result.rows);
      
      const examinationTypeNames = examinationTypes.map(type => type.name);

      res.json(examinationTypeNames);
    } catch(err) {
      console.error(err);
      nmext(err);
    }
  }
}


export default new CommonController();