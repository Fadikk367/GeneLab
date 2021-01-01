import { pool } from '../db/index.js';


const createPersonalData = async ({ firstName, lastName, pesel, dateOfBirth }) => {
  const result = await pool.query(
    `INSERT INTO dane_osobowe 
    (imie, nazwisko, pesel, data_urodzenia) 
    VALUES 
    ($1, $2. $3, $4)
    RETURNING imie as firstName, nazwisko as lastName, pesel, data_urodzenia as dateOfBirth`,
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
  createPersonalData,
  deletePersonalData,
}