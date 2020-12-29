import { pool } from '../db/index.js';


const getAllTests = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT BAD.id, BAD.nazwa as name, cena as price, wartosc_min as minValue, wartosc_max as maxValue, jednostka as unit, MAT.nazwa as bioMaterial, PRAC_DIAG.nazwa as laboratory, KAT_BAD.id as categoryId 
      FROM badanie BAD
      JOIN kategoria_badan KAT_BAD ON BAD.kategoria_id = KAT_BAD.id
      JOIN material_biologiczny MAT ON BAD.material_id = MAT.id
      JOIN pracownia_diagnostyczna PRAC_DIAG ON BAD.pracownia_id = PRAC_DIAG.id
    `);
    res.json({ tests: result.rows });
  } catch(err) {
    console.error(err);
  }
}

const getAllTestNames = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT id, nazwa as name FROM badanie');
    res.json({ testNames: result.rows });
  } catch(err) {
    console.error(err);
  }
}

const getTestWithDetails = async (req, res, next) => {
  const testId = req.params.testId;

  try {
    const result = await pool.query(
      `SELECT id, nazwa as name 
      FROM badanie 
      JOIN kategoria_badan KAT_BAD ON kategoria_id = KAT_BAD.id
      JOIN material MAT ON material_id = MAT.id
      JOIN pracownia_diagnostyczna PRAC_DIAG ON pracownia_id = PRAC_DIAG.id
      WHERE id = $1`,
      [testId]
    );
    res.json({ test: result.rows[0] });
  } catch(err) {
    console.error(err);
  }
}

const createTest = async (req, res, next) => {
  const { 
    name, 
    minValue, 
    maxValue, 
    unit, 
    price, 
    categoryId, 
    materialId, 
    laboratoryId 
  } = req.body;

  try {
  
    const result = await pool.query(
      `INSERT INTO badanie 
      (nazwa, wartosc_min, wartosc_max, jednostka, cena, kategoria_id, material_id, pracownia_id) 
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *`, 
      [name, minValue, maxValue, unit, price, categoryId, materialId, laboratoryId]
    );

    res.json({ createdTest: result.rows[0] });
  } catch(err) {
    console.error(err);
    next(err);
  }
}

const deleteTest = async (req, res, next) => {
  const testId = req.params.testId;

  try {
    const result = await pool.query(
      'DELETE FROM badanie WHERE id = $1 RETURNING id, nazwa as name', 
      [testId]
    );

    res.json({ deletedTest: result.rows[0] });
  } catch(err) {
    console.error(err);
  }
}

const updateTest = async (req, res, next) => {
  const testName = req.body.testName;
  const testId = req.params.testId;

  try {
    const result = await pool.query(
      'UPDATE badanie SET nazwa = $1 WHERE id = $2 RETURNING id, nazwa as name', 
      [testName, testId]
    );
    
    res.json({ updatedTest: result.rows[0] });
  } catch(err) {
    console.error(err);
  }
}


export default {
  createTest,
  getAllTestNames,
  getTestWithDetails,
  getAllTests,
  deleteTest,
  updateTest,
}