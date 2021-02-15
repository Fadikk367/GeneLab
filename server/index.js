// import express from 'express';
// import morgan from 'morgan';
// import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import Server from './Server.js';

new Server().start();


import examinationController from './controllers/ExaminationController.js';
// import commonController from './controllers/CommonController.js';
// import employeeController from './controllers/EmployeeController.js';
// import diagnosticLaboratoryController from './controllers/DiagnosticLaboratoryController.js';
// import reportsContoller from './controllers/ReportsContoller.js';
// import orderController from './controllers/OrderController.js';
// import authController from './controllers/AuthController.js';


// const app = express();
// const PORT = process.env.PORT || 8000;

// app.use(express.static('client/build'));
// app.use(cors())
// app.use(morgan('dev'));
// app.use(express.json());


// app.use('/examinations', examinationController.router);
// app.use('/employees', employeeController.router);
// app.use('/common', commonController.router);
// app.use('/laboratories', diagnosticLaboratoryController.router);
// app.use('/reports', reportsContoller.router);
// app.use('/orders', orderController.router);
// app.use('/auth', authController.router);

// app.get('*', (reg, res) => {
//   res.sendFile('client/build/index.html', { root: './' });
// });

// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });