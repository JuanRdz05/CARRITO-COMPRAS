import dotenv from "dotenv";
dotenv.config();

console.log("DEBUG ENV:", {
    PORT: process.env.PORT || 3001,
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASS,
    NAME: process.env.DB_NAME,
    HOST: process.env.DB_HOST
});


import express from "express";
import { conexion } from "./CONFIG/config.js";
const app = express();

app.get('/', (req, res) => {
    res.send('¡Hola, mundo! con nodemon');
});

conexion.connect(err => {
    if (err) {
        console.error("Error al conectar a MySQL:", err);
        return;
    }

    console.log("Conexión exitosa a MySQL");
    console.log("Base de datos:", conexion.config.database);
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
