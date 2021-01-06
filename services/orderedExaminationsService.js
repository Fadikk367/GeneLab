import { pool } from '../db/index.js';


const getByLaboratoryId = async (laboratoryId, client = pool) => {
  const result = await client.query(
    `SELECT ZL_BAD.id, BAD.nazwa as name, MAT.nazwa as material, BAD.wartosc_min as min, BAD.wartosc_max as max, BAD.jednostka as unit
    FROM zlecenie_badania ZL_BAD
    JOIN badanie BAD ON ZL_BAD.badanie_id = BAD.id
    JOIN material_biologiczny MAT ON BAD.material_id = MAT.id
    WHERE BAD.pracownia_id = $1 AND ZL_BAD.status = 'oczekujace'`, 
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
    HAVING ZL_BAD.status = 'oczekujace'`
  );

  const workOccupancyById = {}
  for (const row of result.rows) {
    workOccupancyById[row.id] = {
      ...row
    }
  }

  return workOccupancyById;
}


export default {
  getByLaboratoryId,
  getCurrentWorkOccupancy,
}