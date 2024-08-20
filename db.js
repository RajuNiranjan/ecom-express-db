import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const DB_Connect = async (req, res, next) => {
    try {
        const db_uri = process.env.DB_URI
        if (!db_uri) {
            return res.status(404).json({ message: "no db_uri found" })
        }
        await mongoose.connect(db_uri).then(() => console.log('server is connected to db')).catch((e) => console.log(e))
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error in db" })
    }
}

DB_Connect()