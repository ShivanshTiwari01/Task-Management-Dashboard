import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRouter from './api/api.routes';

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use((req: Request, res: Response, next: any) => {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  console.log(`  Query:`, req.query);

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(
      `[${timestamp}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`
    );
  });

  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Unauthorized access is prohibited.');
});

app.use('/api', apiRouter);

app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(`[${new Date().toISOString()}] ERROR:`, {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  res.status(500).json({
    error: 'Internal server error',
  });
});

app.listen(port, () => {
  console.log(
    `[${new Date().toISOString()}] Server is running on port: ${port}`
  );
  console.log(
    `[${new Date().toISOString()}] Environment: ${
      process.env.NODE_ENV || 'development'
    }`
  );
});
