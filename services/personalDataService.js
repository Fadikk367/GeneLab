import { pool } from '../db/index.js';


const findByPesel = async (pesel, client = pool) => {
  const result = await client.query(
    `SELECT id, imie as firstName, nazwisko as lastName, data_urodzenia as dateOfBirth, pesel 
    FROM dane_osobowe
    WHERE pesel = $1`,
    [pesel]
  );

  return result.rows[0];
}

const createPersonalData = async ({ firstName, lastName, pesel, dateOfBirth }, client = pool) => {
  const result = await client.query(
    `INSERT INTO dane_osobowe 
    (imie, nazwisko, pesel, data_urodzenia) 
    VALUES 
    ($1, $2, $3, $4)
    RETURNING id, imie as firstName, nazwisko as lastName, pesel, data_urodzenia as dateOfBirth`,
    [firstName, lastName, pesel, dateOfBirth]
  );

  return result.rows[0];
}

const deletePersonalData = async (personalDataId) => {
  const result = await pool.query(
    `DELETE FROM dane_osobowe
    WHERE id = $1`,
    [personalDataId]
  );
}

export default {
  findByPesel,
  createPersonalData,
  deletePersonalData,
}