import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello there, im working fine!' });
});

app.get('*', (reg, res) => {
  res.sendFile('client/public/index.html', { root: './' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});