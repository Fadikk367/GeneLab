import { pool } from '../db/index.js';
import personalDataService from '../services/personalDataService.js';


const createOrder = async (req, res, next) => {
  const { personalData, products } = req.body;
  console.log(req.body);
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    let personalDataId;
    const existingPersonalData = await personalDataService.findByPesel(personalData.pesel, client);
    if (existingPersonalData) {
      personalDataId = existingPersonalData.id;
      console.log('dane osobowe juz istnieja');
    } else {
      const createdPersonalData = await personalDataService.createPersonalData(personalData, client);
      personalDataId = createdPersonalData.id;
      console.log('dane osobowe zostaly stworzone');
    }


    const order = (await client.query(
      `INSERT INTO zamowienie_badan (dane_osobowe_id, data, kod_dostepu) 
      VALUES ($1, $2, $3)
      RETURNING *`,
      [personalDataId, '2021-01-03', 123]
    )).rows[0];

    console.log('stworzono zamowienie')

    for (let product of products) {
      await client.query(
        `INSERT INTO zlecenie_badania (zamowienie_id, badanie_id, status, koszt)
        VALUES ($1, $2, $3, $4)`,
        [order.id, product.id, 'oczekujace', product.price]
      );

      console.log('stworzono zlecienie dla ' + product.name);
    }

    await client.query('COMMIT');
    console.log('poszlo');
    res.json({ createdOrder: order });
  } catch(err) {
    await client.query('ROLLBACK');
    console.log('popsulo sie');
    console.error(err);
  } finally {
    client.release();
  }
}


export default {
  createOrder,
}