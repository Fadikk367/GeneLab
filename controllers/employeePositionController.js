import { pool } from '../db/index.js';


const getAllEmployeePositions = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT id, nazwa as name, pensja as salary, opis as description FROM stanowisko');
    res.json({ employeePositions: result.rows });
  } catch(err) {
    console.error(err);
  }
}

const createEmployeePosition = async (req, res, next) => {
  try {
    console.log(req.body);
    const { positionName, positionSalary, positionDescription } = req.body;
  
    const result = await pool.query('INSERT INTO stanowisko (nazwa, pensja, opis) VALUES ($1, $2, $3) RETURNING id, nazwa as name, pensja as salary, opis as description', [positionName, positionSalary, positionDescription]);
    res.json({ createdEmployeePosition: result.rows[0] });
  } catch(err) {
    console.error(err);
  }
}

const deleteEmployeePosition = async (req, res, next) => {
  const positionId = req.params.positionId;

  try {
    const result = await pool.query('DELETE FROM stanowisko WHERE id = $1 RETURNING id, nazwa as name', [positionId]);
    res.json({ deletedEmployeePosition: result.rows[0] });
  } catch(err) {
    console.error(err);
  }
}

const updateEmployeePosition = async (req, res, next) => {
  const positionId = req.params.positionId;
  const positionNSalary = req.body.positionSalary;

  try {
    const result = await pool.query('UPDATE stanowisko SET pensja = $1 WHERE id = $2 RETURNING id, nazwa as name, pensja as salary, opis as description', [positionNSalary, positionId]);
    res.json({ updatedEmployeePosition: result.rows[0] });
  } catch(err) {
    console.error(err);
  }
}


export default {
  getAllEmployeePositions,
  createEmployeePosition,
  deleteEmployeePosition,
  updateEmployeePosition,
}