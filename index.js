import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


import testCategoryRouter from './routes/testCategoryRouter.js';
import biologicalMaterialRouter from './routes/biologicalMaterialRouter.js';
import diagnosticLaboratoryRouter from './routes/diagnosticLaboratoryRouter.js';
import testRouter from './routes/testRouter.js';
import employeePositionRouter from './routes/employeePositionRouter.js';


const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static('client/build'));
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());


app.use('/categories', testCategoryRouter);
app.use('/materials', biologicalMaterialRouter);
app.use('/laboratories', diagnosticLaboratoryRouter);
app.use('/tests', testRouter);
app.use('/positions', employeePositionRouter);

app.get('*', (reg, res) => {
  res.sendFile('client/build/index.html', { root: './' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});