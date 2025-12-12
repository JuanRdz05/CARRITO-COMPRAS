import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { conectarDB } from '../../CONFIG/config.js';

const router = express.Router();

// Setup para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('📁 main.js __dirname:', __dirname);

// ==========================================
// RUTAS PARA SERVIR PÁGINAS HTML
// ==========================================

// Ruta principal - Página de inicio
router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../../../HTML/index.html');
    console.log('📄 Sirviendo index.html desde:', filePath);
    res.sendFile(filePath);
});

// Ruta de login
router.get('/login', (req, res) => {
    const filePath = path.join(__dirname, '../../../HTML/login.html');
    console.log('📄 Sirviendo login.html desde:', filePath);
    res.sendFile(filePath);
});

// Ruta de registro
router.get('/register', (req, res) => {
    const filePath = path.join(__dirname, '../../../HTML/registro.html');
    console.log('📄 Sirviendo registro.html desde:', filePath);
    res.sendFile(filePath);
});

// Ruta de productos
router.get('/productos', (req, res) => {
    const filePath = path.join(__dirname, '../../HTML/productos.html');
    console.log('📄 Sirviendo productos.html desde:', filePath);
    res.sendFile(filePath);
});


export default router;