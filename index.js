import express from 'express';
import './db.js';
import dotenv from 'dotenv';
import { AuthRouter } from './routers/auth.route.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));

app.get('/', (req, res) => {
    res.json("server is running")
})

app.use('/api', AuthRouter);


app.listen(port, () => console.log(`Server is running at port number: ${port}`));