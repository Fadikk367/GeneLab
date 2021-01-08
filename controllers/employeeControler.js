import { pool } from '../db/index.js';
import personalDataService from '../services/personalDataService.js';
import authService from '../services/authService.js';


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
    const client = await pool.connect();
    // const { firstName, lastName, pesel, dateOfBirth } = req.body.personalData;
    const { positionId, email, password } = req.body.employeeData;

    const personalData = await personalDataService.createPersonalData(req.body.personalData, client);

  
    const { id } = await authService.registerEmployee({
      personalDataId: personalData.id,
      positionId,
      email,
      password,
    }, client);

    res.json({ 
      createdEmployee: {
        id,
        email,
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