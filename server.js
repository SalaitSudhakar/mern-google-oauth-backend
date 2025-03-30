import express from 'express';
import dotenv from 'dotenv';
import connectDb from './Database/config.js';

dotenv.config();

const app = express();

const port =  process.env.PORT || 4000;

connectDb();

app.listen(port, () => {
    console.log("Server is started and running on the port")
})
