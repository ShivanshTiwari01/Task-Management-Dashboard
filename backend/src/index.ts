import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRouter from './api/api.routes';

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Unauthorized access is prohibited.');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
