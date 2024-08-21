import express from 'express';
import './db.js';
import dotenv from 'dotenv';
import { AuthRouter } from './routers/auth.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.listen(port, () => console.log(`Server is running at port number: ${port}`));

app.use('/api', AuthRouter);