import { pool } from '../db/index.js';
import orderedExaminationsService from '../services/orderedExaminationsService.js';


const getAllLaboratories = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT id, nazwa as name, opis as description FROM pracownia_diagnostyczna');
    res.json({ diagnosticLaboratories: result.rows });
  } catch(err) {
    console.error(err);
  }
}

const getPendingExaminations = async (req, res, next) => {
  const laboratoryId = req.parmas.laboratoryId;

  try {
    const pendingExaminations = await orderedExaminationsService.getByLaboratoryId(laboratoryId);
    res.json({ pendingExaminations, laboratoryId });
  } catch(err) {
    console.error(err);
    next(err);
  }
}

const getCurrentWorkOccupancy = async (req, res, next) => {
  try {
    const workOccupancyById = await orderedExaminationsService.getCurrentWorkOccupancy();
    res.json({ workOccupancyById });
  } catch(err) {
    console.error(err);
    next(err);
  }
}

const createLaboratory = async (req, res, next) => {
  try {
    const { laboratoryName, laboratoryDescription } = req.body;
  
    const result = await pool.query('INSERT INTO pracownia_diagnostyczna (nazwa, opis) VALUES ($1, $2) RETURNING id, nazwa as name, opis as description', [laboratoryName, laboratoryDescription]);
    res.json({ createdDiagnosticLaboratory: result.rows[0] });
  } catch(err) {
    console.error(err);
  }
}

const deleteLaboratory = async (req, res, next) => {
  const laboratoryId = req.params.laboratoryId;

  try {
    const result = await pool.query('DELETE FROM pracownia_diagnostyczna WHERE id = $1 RETURNING id, nazwa as name, opis as description', [laboratoryId]);
    res.json({ deletedDiagnosticLaboratory: result.rows[0] });
  } catch(err) {
    console.error(err);
  }
}

const updateLaboratory = async (req, res, next) => {
  const laboratoryName = req.body.materialName;
  const laboratoryId = req.params.categoryId;

  try {
    const result = await pool.query('UPDATE pracownia_diagnostyczna SET nazwa = $1 WHERE id = $2 RETURNING id, nazwa as name, opis as description', [laboratoryName, laboratoryId]);
    res.json({ updatedDiagnosticLaboratory: result.rows });
  } catch(err) {
    console.error(err);
  }
}


export default {
  getAllLaboratories,
  getPendingExaminations,
  getCurrentWorkOccupancy,
  createLaboratory,
  deleteLaboratory,
  updateLaboratory,
}