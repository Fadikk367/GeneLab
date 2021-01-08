import { pool } from '../db/index.js';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const THREE_DAYS_IN_SECCONDS = 3*24*60*60;


export const login = async (credentials, client = pool) => {
  const { email, password } = credentials;

  const result = await client.query(
    `SELECT D_OS.imie as firstName, D_OS.nazwisko as lastName, ST.nazwa as position, PR.haslo as password, PR.id
    FROM pracownik PR
    JOIN dane_osobowe D_OS ON PR.dane_osobowe_id = D_OS.id
    JOIN stanowisko ST ON PR.stanowisko_id = ST.id
    WHERE PR.email = $1
    LIMIT 1`,
    [email]
  );

  const existingUser = result.rows[0];

  if (!bcrypt.compare(password, existingUser.password)) {
    throw new Error('Błędne dane logowania!');
  }

  const tokenPayload = {
    id: existingUser.id,
    firstName: existingUser.firstname,
    lastName: existingUser.lastname,
    position: existingUser.position,
  }

  const secret = process.env.TOKEN_SECRET;

  const token = jwt.sign({ tokenPayload }, secret, { expiresIn: THREE_DAYS_IN_SECCONDS });

  return {
    authToken: token,
    user: tokenPayload,
  }
}


export const registerEmployee = async (employeeData, client = pool) => {
  const { 
    personalDataId,
    positionId,
    email,
    password
  } = employeeData;

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const result = await client.query(
    `INSERT INTO pracownik 
    (dane_osobowe_id, stanowisko_id, email, haslo, data_zatrudnienia) 
    VALUES 
    ($1, $2, $3, $4, $5) 
    RETURNING id, email`, 
    [personalDataId, positionId, email, passwordHash, new Date().toISOString().substring(0, 10)]
  );

  return {
    id: result.rows[0].id,
    email: result.rows[0].email,
  }
} 


export default {
  login,
  registerEmployee,
}