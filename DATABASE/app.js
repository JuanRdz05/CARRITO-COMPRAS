// app.js CORREGIDO

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mainRoutes from './SRC/ROUTES/main.js';

// Setup para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear aplicación Express
const app = express();

// ==========================================
// MIDDLEWARES
// ==========================================

// Parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// SERVIR ARCHIVOS ESTÁTICOS
// ==========================================
// IMPORTANTE: Las rutas deben coincidir con tu estructura de carpetas

// Servir CSS desde la carpeta raíz/CSS
app.use('/CSS', express.static(path.join(__dirname, 'CSS')));

// Servir JS desde la carpeta raíz/JS (si la tienes)
app.use('/JS', express.static(path.join(__dirname, 'JS')));

// Servir imágenes desde la carpeta raíz (las .png que tienes)
app.use('/img', express.static(path.join(__dirname)));

// Servir DATABASE desde la carpeta raíz/DATABASE
app.use('/DATABASE', express.static(path.join(__dirname, 'DATABASE')));

// Middleware de logs (opcional pero útil para debug)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
});

// ==========================================
// RUTAS
// ==========================================

// Usar las rutas principales
app.use('/', mainRoutes);

// Ruta 404 - Página no encontrada
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 - Página no encontrada</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                    background: linear-gradient(135deg, #FFC4C4, #EE6983);
                }
                .container {
                    text-align: center;
                    padding: 2rem;
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                }
                h1 {
                    color: #850E35;
                    font-size: 4rem;
                    margin: 0;
                }
                p {
                    color: #EE6983;
                    font-size: 1.2rem;
                }
                a {
                    display: inline-block;
                    margin-top: 1rem;
                    padding: 0.8rem 2rem;
                    background: #EE6983;
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    transition: background 0.3s;
                }
                a:hover {
                    background: #850E35;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>404</h1>
                <p>La página que buscas no existe</p>
                <a href="/">Volver al inicio</a>
            </div>
        </body>
        </html>
    `);
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ 
        error: 'Algo salió mal en el servidor' 
    });
});

export default app;