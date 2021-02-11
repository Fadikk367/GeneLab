import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { pool } from '../db/index.js';
import { translateResultRow, translateResultRows } from '../utils/variableNamesTranslator.js';

const THREE_DAYS_IN_SECCONDS = 3*24*60*60;


export const login = async (credentials, client = pool) => {
  const { email, password } = credentials;
  console.log({credentials})

  const result = await client.query(
    `SELECT D_OS.imie as imie, D_OS.nazwisko as nazwisko, ST.nazwa as stanowisko, PR.haslo as haslo, PR.id, PR.laboratorium_id
    FROM pracownik PR
    JOIN dane_osobowe D_OS ON PR.dane_osobowe_id = D_OS.id
    JOIN stanowisko ST ON PR.stanowisko_id = ST.id
    WHERE PR.email = $1
    LIMIT 1`,
    [email]
  );

  const existingUser = translateResultRow(result.rows[0]);
  
  if (!existingUser.password) {
    throw new Error('Błędne dane logowania!');
  }

  if (!bcrypt.compare(password, existingUser.password)) {
    throw new Error('Błędne dane logowania!');
  }

  const tokenPayload = {
    id: existingUser.id,
    firstName: existingUser.firstName,
    lastName: existingUser.lastName,
    position: existingUser.position,
    laboratoryId: existingUser.laboratoryId,
  }

  const secret = process.env.TOKEN_SECRET;

  const token = jwt.sign(tokenPayload, secret, { expiresIn: THREE_DAYS_IN_SECCONDS });

  return {
    authToken: token,
    user: tokenPayload,
  }
}


export const registerEmployee = async (employeeData, client = pool) => {
  const { 
    personalDataId,
    positionId,
    laboratoryId,
    email,
    password
  } = employeeData;

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const result = await client.query(
    `INSERT INTO pracownik 
    (dane_osobowe_id, stanowisko_id, laboratorium_id, email, haslo, data_zatrudnienia) 
    VALUES 
    ($1, $2, $3, $4, $5, $6) 
    RETURNING id, email, data_zatrudnienia`, 
    [personalDataId, positionId, laboratoryId, email, passwordHash, new Date().toISOString().substring(0, 10)]
  );

  const addedEmployee = translateResultRow(result.rows[0]);

  return {
    id: addedEmployee.id,
    email: addedEmployee.email,
    employmentDate: addedEmployee.employmentDate,
  }
} 


const authEmployee = async (token) => {
  const secret = process.env.TOKEN_SECRET;

  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch(err) {
    console.log(err.message);
    throw new Error("VIOLATED TOKEN!!!");
  }
}


export default {
  login,
  authEmployee,
  registerEmployee,
}