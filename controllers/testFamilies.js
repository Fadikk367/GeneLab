import { pool } from '../db/index.js';

const createFamily = async (req, res, next) => {
  try {
    const familyName = req.body.familyName;
  
    const result = await pool.query('INSERT INTO rodzina_badan (nazwa) VALUES ($1) RETURNING id, nazwa as familyName', [familyName]);
    res.json({ createdTestFamily: result.rows[0] });
  } catch(err) {
    console.error(err);
  }
}


const getAllFamilies = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT id, nazwa as familyname FROM rodzina_badan');
    res.json({ testFamilies: result.rows });
  } catch(err) {
    console.error(err);
  }
}


const deleteFamily = async (req, res, next) => {
  const familyId = req.params.familyId;

  try {
    const result = await pool.query('DELETE FROM rodzina_badan WHERE id = $1 RETURNING id, nazwa as familyName', [familyId]);
    res.json({ deletedTestFamily: result.rows[0] });
  } catch(err) {
    console.error(err);
  }
}


const updateFamily = async (req, res, next) => {
  const familyName = req.body.familyName;
  const familyId = req.params.familyId;

  try {
    const result = await pool.query('UPDATE rodzina_badan SET nazwa = $1 WHERE id = $2 RETURNING id, nazwa as familyName', [familyName, familyId]);
    res.json({ tests: result.rows });
  } catch(err) {
    console.error(err);
  }
}


export default {
  createFamily,
  getAllFamilies,
  deleteFamily,
  updateFamily,
}