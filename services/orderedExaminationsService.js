import { pool } from '../db/index.js';
import { translateResultRows } from '../utils/variableNamesTranslator.js';


const getByLaboratoryId = async (laboratoryId, client = pool) => {
  const result = await client.query(
    `SELECT * FROM laboratorium_zlecenia_badan WHERE laboratorium_id = $1`, 
    [laboratoryId]
  );

  return translateResultRows(result.rows);
}

const getCurrentWorkOccupancy = async (client = pool) => {
  const result = await client.query(`SELECT * FROM laboratorium_oblozenie_praca`);
  const pendingExaminations = translateResultRows(result.rows);

  const workOccupancyById = {}
  for (const row of pendingExaminations) {
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