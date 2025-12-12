// test-server.js
// Crea este archivo en la raíz y ejecútalo para probar

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002; // Puerto diferente para no interferir

console.log('==========================================');
console.log('🧪 TEST DE SERVIDOR');
console.log('==========================================\n');

// Test 1: Servir CSS
app.use('/CSS', express.static(path.join(__dirname, 'CSS')));
console.log('✅ Configurado: /CSS -> ', path.join(__dirname, 'CSS'));

// Test 2: Servir DATABASE
app.use('/DATABASE', express.static(path.join(__dirname, 'DATABASE')));
console.log('✅ Configurado: /DATABASE -> ', path.join(__dirname, 'DATABASE'));

// Test 3: Servir archivos raíz
app.use(express.static(__dirname, { index: false }));
console.log('✅ Configurado: / (raíz) -> ', __dirname);

// Middleware de logging
app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.url}`);
    next();
});

// Ruta de test
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Test</title>
            <link rel="stylesheet" href="/CSS/navbar.css">
        </head>
        <body>
            <h1>Test del Servidor</h1>
            <p>Si ves esta página, el servidor funciona.</p>
            <p>Abre la consola del navegador (F12) para ver si el CSS se carga.</p>
            <ul>
                <li><a href="/CSS/navbar.css" target="_blank">Test: navbar.css</a></li>
                <li><a href="/CSS/footer.css" target="_blank">Test: footer.css</a></li>
                <li><a href="/CSS/INICIO/inicio.css" target="_blank">Test: inicio.css</a></li>
                <li><a href="/hornet%20(1).png" target="_blank">Test: imagen</a></li>
            </ul>
            <p>Haz clic en los links arriba. Si se descargan/muestran, funciona.</p>
        </body>
        </html>
    `);
});

// 404
app.use((req, res) => {
    console.log(`❌ 404: ${req.url}`);
    res.status(404).send('404 - No encontrado: ' + req.url);
});

app.listen(PORT, () => {
    console.log('\n==========================================');
    console.log(`🚀 Servidor de test corriendo en http://localhost:${PORT}`);
    console.log('==========================================\n');
    console.log('Prueba estos links en tu navegador:');
    console.log(`  • http://localhost:${PORT}/`);
    console.log(`  • http://localhost:${PORT}/CSS/navbar.css`);
    console.log(`  • http://localhost:${PORT}/hornet%20(1).png`);
    console.log('\nPresiona Ctrl+C para detener\n');
});