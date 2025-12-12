import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mainRoutes from './DATABASE/SRC/ROUTES/main.js';

// Setup para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('📁 Directorio base:', __dirname);
console.log('📁 Ruta CSS:', path.join(__dirname, '../CSS'));

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

// IMPORTANTE: Los archivos estáticos deben ir ANTES de las rutas

// 1. Servir CSS
app.use('../CSS', express.static(path.join(__dirname, 'CSS'), {
    setHeaders: (res, filepath) => {
        if (filepath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

// 2. Servir DATABASE
app.use('/DATABASE', express.static(path.join(__dirname, 'DATABASE')));

// 3. Servir archivos de la raíz (como imágenes)
app.use(express.static(__dirname, {
    index: false  // No servir index.html desde aquí
}));

// Middleware de debug - ver todas las peticiones
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// ==========================================
// RUTAS DE PÁGINAS HTML
// ==========================================

// IMPORTANTE: Las rutas de páginas deben ir DESPUÉS de los archivos estáticos
app.use('/', mainRoutes);

// ==========================================
// MANEJO DE ERRORES
// ==========================================

// Ruta 404 - Página no encontrada
app.use((req, res) => {
    console.log('❌ 404 - No encontrado:', req.url);
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
                code {
                    background: #f4f4f4;
                    padding: 0.2rem 0.5rem;
                    border-radius: 4px;
                    display: block;
                    margin: 1rem 0;
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
                <code>${req.url}</code>
                <a href="/">Volver al inicio</a>
            </div>
        </body>
        </html>
    `);
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('❌ Error en el servidor:', err.stack);
    res.status(500).send(
     `
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
                code {
                    background: #f4f4f4;
                    padding: 0.2rem 0.5rem;
                    border-radius: 4px;
                    display: block;
                    margin: 1rem 0;
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
                <h1>Página en desarrollo</h1>
                <p>La página que buscas no existe</p>
                <a href="/">Volver al inicio</a>
            </div>
        </body>
        </html>
    `   
        );
});

export default app;