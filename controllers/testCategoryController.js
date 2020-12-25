import { pool } from '../db/index.js';


const getAllCategories = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT id, nazwa as categoryName FROM kategoria_badan');
    res.json({ testCategories: result.rows });
  } catch(err) {
    console.error(err);
  }
}

const createCategory = async (req, res, next) => {
  try {
    const categoryName = req.body.categoryName;
  
    const result = await pool.query('INSERT INTO kategoria_badan (nazwa) VALUES ($1) RETURNING id, nazwa as categoryName', [categoryName]);
    res.json({ createdTestCategory: result.rows[0] });
  } catch(err) {
    console.error(err);
  }
}

const deleteCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  try {
    const result = await pool.query('DELETE FROM kategoria_badan WHERE id = $1 RETURNING id, nazwa as categoryName', [categoryId]);
    res.json({ deletedTestCategory: result.rows[0] });
  } catch(err) {
    console.error(err);
  }
}

const updateCategory = async (req, res, next) => {
  const categoryName = req.body.categoryName;
  const categoryId = req.params.categoryId;

  try {
    const result = await pool.query('UPDATE kategoria_badan SET nazwa = $1 WHERE id = $2 RETURNING id, nazwa as categoryName', [categoryName, categoryId]);
    res.json({ updatedTestCategory: result.rows });
  } catch(err) {
    console.error(err);
  }
}


export default {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
}