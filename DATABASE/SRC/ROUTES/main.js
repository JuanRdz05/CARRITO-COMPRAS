import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { conectarDB } from '../../CONFIG/config.js';

const router = express.Router();

// Setup para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// RUTAS PARA SERVIR PÁGINAS HTML
// ==========================================

// Ruta principal - Página de inicio
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../HTML/index.html'));
});

// Ruta de login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../HTML/login.html'));
});

// Ruta de registro
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../HTML/registro.html'));
});

// Ruta de productos
router.get('/productos', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../HTML/productos.html'));
});

export default router;