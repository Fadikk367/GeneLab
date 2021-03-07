import { Router } from 'express';
import { v4 as uuid } from 'uuid';

import { pool } from '../db/index.js';
import personalDataService from '../services/personalDataService.js';
import { translateResultRows, translateResultRow } from '../utils/variableNamesTranslator.js';


class OrderController {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/', this.createOrder);
    this.router.get('/:code/results', this.getOrderResults);
  }

  async getOrderResults(req, res, next) {
    const accessCode = req.params.code;
  
    try {
      const result1 = await pool.query(`SELECT * FROM pobierz_wyniki_badan($1)`, [accessCode]);
      const result2 = await pool.query(`SELECT * FROM pobierz_metadane_zamowienia($1)`, [accessCode]);
  
      const results = translateResultRows(result1.rows);
      const metadata = translateResultRow(result2.rows[0]);
  
      res.json({ results, metadata });
    } catch(err) {
      if (err.code === 'P0001') {
        res.status(404).json({ message: err.message });
      } else {
        next(err);
      }
    }
  }

  async createOrder(req, res, next) {
    const { personalData, products, selectedPoint, paymentMethod } = req.body;
    console.log(req.body);
    const laboratoryId = selectedPoint.laboratoryId;
    const bloodCollectionPointId = selectedPoint.id;

    const client = await pool.connect();
  
    try {
      await client.query('BEGIN');
  
      let personalDataId;
      const existingPersonalData = await personalDataService.findByPesel(personalData.pesel, client);
      if (existingPersonalData.id) {
        personalDataId = existingPersonalData.id;
      } else {
        const createdPersonalData = await personalDataService.createPersonalData(personalData, client);
        personalDataId = createdPersonalData.id;
      }
  
  
      const order = (await client.query(
        `INSERT INTO zamowienie_badan (dane_osobowe_id, punkt_pobran_id, data, kod_dostepu) 
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [personalDataId, bloodCollectionPointId, new Date(), uuid()]
      )).rows[0];
  
      const totalPrice = products.reduce((total, product) => total += parseFloat(product.price), 0.0);
  
      await client.query(
        `INSERT INTO platnosc (zamowienie_id, rodzaj, kwota) VALUES ($1, $2, $3)`, 
        [order.id, paymentMethod, totalPrice]
      );
  
      for (let product of products) {
        await client.query(
          `INSERT INTO zlecenie_badania (zamowienie_id, laboratorium_id, badanie_id, koszt)
          VALUES ($1, $2, $3, $4)`,
          [order.id, laboratoryId, product.id, product.price]
        );
      }
  
      await client.query('COMMIT');
      res.json({ createdOrder: translateResultRow(order) });
    } catch(err) {
      client.query('ROLLBACK');
      console.error(err);
      next(err);
    } finally {
      client.release();
    }
  }
}


export default new OrderController();