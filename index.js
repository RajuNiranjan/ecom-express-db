import express, { json } from 'express';
import './db.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000


app.use(json())

app.listen(port, () => console.log(`server is running at port number : ${port}`))
