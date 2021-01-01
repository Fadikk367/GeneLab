import { pool } from '../db/index.js';
import personalDataService from '../services/personalDataService.js';


const getAllEmployees = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * from pracownik_komplet_informacji');
    res.json({ employees: result.rows });
  } catch(err) {
    console.error(err);
  }
}

const createEmployee = async (req, res, next) => {
  try {
    // const { firstName, lastName, pesel, dateOfBirth } = req.body.personalData;
    const { positionId, email, password } = req.body.employeeData;

    const personalData = await personalDataService.createPersonalData(req.body.personalData);

  
    const result = await pool.query(
      `INSERT INTO pracownik 
      (dane_osobowe_id, stanowisko_id, email, haslo, data_zatrudnienia) 
      VALUES 
      ($1, $2, $3, $4, $5) 
      RETURNING id, email`, 
      [personalData.id, positionId, email, password, '2020-07-12']
    );

    res.json({ 
      createdEmployee: {
        id: result.rows[0].id,
        email: result.rows[0].id,
        ...personalData,
      } 
    });
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