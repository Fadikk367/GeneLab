import { Router } from 'express';

import { pool } from '../db/index.js'
import bloodCollectionPointController from './BloodCollectionPointController.js'
// import orderedExaminationsService from '../services/orderedExaminationsService.js';
import { translateResultRow, translateResultRows } from '../utils/variableNamesTranslator.js'


class DiagnosticLaboratoryController {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.getAllLaboratories);
    this.router.post('/', this.createLaboratory);
    this.router.delete('/:laboratoryId', this.deleteLaboratory);

    this.router.use('/collection-points', bloodCollectionPointController.router);
  }

  async getAllLaboratories(req, res, next) {
    try {
      const result = await pool.query('SELECT * FROM laboratorium_diagnostyczne');
      const laboratories = translateResultRows(result.rows);

      res.json(laboratories);
    } catch(err) {
      console.error(err);
      next(err);
    }
  }

  async createLaboratory(req, res, next) {
    const { city, address, numberOfDevices } = req.body;

    try {
      const result = await pool.query(
        `INSERT INTO laboratorium_diagnostyczne (miasto, adres, liczba_aparatow) 
        VALUES ($1, $2, $3) 
        RETURNING *`, 
        [city, address, numberOfDevices]
      );

      const createdLaboratory = translateResultRow(result.rows[0]);
      res.json(createdLaboratory);
    } catch(err) {
      console.error(err);
      next(err);
    }
  }

  async deleteLaboratory(req, res, next) {
    const laboratoryId = parseInt(req.params.laboratoryId);
  
    try {
      const result = await pool.query(
        `DELETE FROM laboratorium_diagnostyczne 
        WHERE id = $1 
        RETURNING id`, 
        [laboratoryId]
      );

      res.json(result.rows[0].id);
    } catch(err) {
      console.error(err);
      next(err);
    }
  }
}

export default new DiagnosticLaboratoryController();








// const getPendingExaminations = async (req, res, next) => {
//   const laboratoryId = req.params.laboratoryId;

//   try {
//     const pendingExaminations = await orderedExaminationsService.getByLaboratoryId(laboratoryId);
//     res.json({ pendingExaminations, laboratoryId });
//   } catch(err) {
//     console.error(err);
//     next(err);
//   }
// }

// const getCurrentWorkOccupancy = async (req, res, next) => {
//   try {
//     const workOccupancyById = await orderedExaminationsService.getCurrentWorkOccupancy();
//     res.json({ workOccupancyById });
//   } catch(err) {
//     console.error(err);
//     next(err);
//   }
// }


// const updateLaboratory = async (req, res, next) => {
//   const laboratoryName = req.body.materialName;
//   const laboratoryId = req.params.categoryId;

//   try {
//     const result = await pool.query('UPDATE pracownia_diagnostyczna SET nazwa = $1 WHERE id = $2 RETURNING id, nazwa as name, opis as description', [laboratoryName, laboratoryId]);
//     res.json({ updatedDiagnosticLaboratory: result.rows });
//   } catch(err) {
//     console.error(err);
//   }
// }