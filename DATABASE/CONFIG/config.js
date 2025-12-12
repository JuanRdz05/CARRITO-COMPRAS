import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Crear conexión a MySQL
export const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

// Función para conectar a la base de datos
export const conectarDB = () => {
    return new Promise((resolve, reject) => {
        conexion.connect((err) => {
            if (err) {
                console.error('❌ Error al conectar a MySQL:', err);
                reject(err);
            } else {
                console.log('✅ Conexión exitosa a MySQL');
                console.log('📊 Base de datos:', conexion.config.database);
                resolve();
            }
        });
    });
};

// Configuración adicional de la base de datos
export const DB_CONFIG = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
};