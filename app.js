import express from 'express';
import mysql from 'mysql2';
import routesUsers from './src/routes/users.js';
import dotenv from 'dotenv';
dotenv.config();

const port = 3000;
const app = express();

app.use(express.json());
app.use('/api', routesUsers);

app.listen(port, () =>{
    console.log(`Servidor rodando em http://localhost:${port}`);
});

