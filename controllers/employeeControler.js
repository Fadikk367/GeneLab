import { pool } from '../db/index.js';
import personalDataService from '../services/personalDataService.js';


const getAllEmployees = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT id, nazwa as name, pensja as salary, opis as description FROM pracownik');
    res.json({ employeePositions: result.rows });
  } catch(err) {
    console.error(err);
  }
}

const createEmployee = async (req, res, next) => {
  try {
    // const { firstName, lastName, pesel, dateOfBirth } = req.body.personalData;
    const { positionId, email, password } = req.body.employeeData;

    const personalData = personalDataService.createPersonalData(req.body.personalData)
  
    const createdEmployee = await pool.query(
      `INSERT INTO pracownik 
      (dane_osobowe_id, stanowisko_id, email, haslo, data_zatrudnienia) 
      VALUES 
      ($1, $2, $3) 
      RETURNING id, nazwa as name, pensja as salary, opis as description`, 
      [personalData.id, positionId, email, password, Date.now()]
    ).rows[0];

    res.json({ createdEmployee });
  } catch(err) {
    console.error(err);
  }
}

const deleteEmployee = async (req, res, next) => {
  const employeeId = req.params.employeeId;

  try {
    const deletedEmployee = await pool.query(
      'DELETE FROM pracownik WHERE id = $1 RETURNING dane_osobowe_id as personalDataId', 
      [employeeId]
    ).rows[0];

    personalDataService.deletePersonalData(deleteEmployee.personaldataid);

    res.json({ deletedEmployee });
  } catch(err) {
    console.error(err);
  }
}


export default {
  getAllEmployees,
  createEmployee,
  deleteEmployee,
}