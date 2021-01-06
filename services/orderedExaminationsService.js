import { pool } from '../db/index.js';


const getByLaboratoryId = async (laboratoryId, client = pool) => {
  const result = await client.query(
    `SELECT * 
    FROM zlecenie_badania ZL_BAD
    JOIN badanie BAD ON ZL_BAD.badanie_id = BAD.id
    WHERE BAD.pracownia_id = $1`, 
    [laboratoryId]
  );

  return result.rows;
}

const getCurrentWorkOccupancy = async (client = pool) => {
  const result = await client.query(
    `SELECT PRAC_DIAG.id, PRAC_DIAG.nazwa as name, COUNT(*) as pending
    FROM zlecenie_badania ZL_BAD
    JOIN badanie BAD ON ZL_BAD.badanie_id = BAD.id
    JOIN pracownia_diagnostyczna PRAC_DIAG ON BAD.pracownia_id = PRAC_DIAG.id
    GROUP BY PRAC_DIAG.id, PRAC_DIAG.nazwa, ZL_BAD.status
    HAVING ZL_BAD.status = 'oczekujace';`, 
    [laboratoryId]
  );

  return result.rows;
}


export default {
  getByLaboratoryId,
  getCurrentWorkOccupancy,
}