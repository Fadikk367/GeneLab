import { pool } from '../db/index.js';


const getAllCategories = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT id, nazwa as name, opis as description FROM kategoria_badan');
    res.json({ testCategories: result.rows });
  } catch(err) {
    console.error(err);
  }
}

const createCategory = async (req, res, next) => {
  try {
    const { categoryName, categoryDescription } = req.body;
  
    const result = await pool.query('INSERT INTO kategoria_badan (nazwa, opis) VALUES ($1, $2) RETURNING id, nazwa as name, opis as description', [categoryName, categoryDescription]);
    res.json({ createdTestCategory: result.rows[0] });
  } catch(err) {
    console.error(err);
  }
}

const deleteCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  try {
    const result = await pool.query('DELETE FROM kategoria_badan WHERE id = $1 RETURNING id, nazwa as name, opis as description', [categoryId]);
    res.json({ deletedTestCategory: result.rows[0] });
  } catch(err) {
    console.error(err);
  }
}

const updateCategory = async (req, res, next) => {
  const categoryName = req.body.categoryName;
  const categoryId = req.params.categoryId;

  try {
    const result = await pool.query('UPDATE kategoria_badan SET nazwa = $1 WHERE id = $2 RETURNING id, nazwa as name, opis as description', [categoryName, categoryId]);
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