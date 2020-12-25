import { pool } from '../db/index.js';


const getAllMaterials = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT id, nazwa as name, opis as description FROM material_biologiczny');
    res.json({ biologicalMaterials: result.rows });
  } catch(err) {
    console.error(err);
  }
}

const createMaterial = async (req, res, next) => {
  try {
    const { materialName, materialDescription } = req.body;
  
    const result = await pool.query('INSERT INTO material_biologiczny (nazwa, opis) VALUES ($1, $2) RETURNING id, nazwa as name, opis as description', [materialName, materialDescription]);
    res.json({ createdBiologicalMaterial: result.rows[0] });
  } catch(err) {
    console.error(err);
  }
}

const deleteMaterial = async (req, res, next) => {
  const materialId = req.params.materialId;

  try {
    const result = await pool.query('DELETE FROM material_biologiczny WHERE id = $1 RETURNING id, nazwa as name, opis as description', [materialId]);
    res.json({ deletedBiologicalMaterial: result.rows[0] });
  } catch(err) {
    console.error(err);
  }
}

const updateMaterial = async (req, res, next) => {
  const materialName = req.body.materialName;
  const materialId = req.params.categoryId;

  try {
    const result = await pool.query('UPDATE material_biologiczny SET nazwa = $1 WHERE id = $2 RETURNING id, nazwa as name, opis as description', [materialName, materialId]);
    res.json({ updatedBiologicalMaterial: result.rows });
  } catch(err) {
    console.error(err);
  }
}


export default {
  createMaterial,
  getAllMaterials,
  deleteMaterial,
  updateMaterial,
}