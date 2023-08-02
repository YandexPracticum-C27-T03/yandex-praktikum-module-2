import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import ssr from './middlewares/ssr';

dotenv.config();

async function startServer() {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;

  const middlewareSsr = await ssr(app);

  app.use('*', async (req, res, next) => await middlewareSsr(req, res, next));

  app.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

startServer();
