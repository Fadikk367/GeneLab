import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import examinationController from './controllers/ExaminationController.js';
import commonController from './controllers/CommonController.js';
import employeeController from './controllers/EmployeeController.js';
import diagnosticLaboratoryController from './controllers/DiagnosticLaboratoryController.js';
import reportsContoller from './controllers/ReportsContoller.js';
import orderController from './controllers/OrderController.js';
import authController from './controllers/AuthController.js';


class Server {
  PORT = process.env.PORT || 8000;

  constructor() {
    this.app = express();

    this.initializeMiddlewares();
    this.attachControllers();
    this.setReactAppFilesServing();
    this.setErrorHandler();
  }

  start() {
    this.app.listen(this.PORT, () => {
      console.log(`Server is listening on port ${this.PORT}`);
    });
  }

  initializeMiddlewares() {
    this.app.use(express.static('client/build'));
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
  }

  attachControllers() {
    this.app.use('/api/examinations', examinationController.router);
    this.app.use('/api/employees', employeeController.router);
    this.app.use('/api/common', commonController.router);
    this.app.use('/api/laboratories', diagnosticLaboratoryController.router);
    this.app.use('/api/reports', reportsContoller.router);
    this.app.use('/api/orders', orderController.router);
    this.app.use('/api/auth', authController.router);
  }

  setReactAppFilesServing() {
    this.app.get('*', (reg, res) => {
      // res.sendFile('client/build/index.html', { root: './' });
      res.sendFile(path.join('./', 'client', 'build', 'index.html'), { root: './' });
    });
  }

  setErrorHandler() {
    this.app.use((err, req, res, next) => {
      console.log('ERROR HANDLER');
      console.log(err);

      res.status(500).send('Something broke!');
    })
  }
}


export default Server;