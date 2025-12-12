import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { conectarDB } from './CONFIG/config.js';

const PORT = process.env.PORT || 3001;

// ==========================================
// INICIAR SERVIDOR
// ==========================================

const iniciarServidor = async () => {
    try {
        // Conectar a la base de datos
        await conectarDB();
        
        // Iniciar el servidor Express
        app.listen(PORT, () => {
            console.log('==========================================');
            console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
            console.log(`🌐 URL: http://localhost:${PORT}`);
            console.log('==========================================');
        });
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1); 
    }
};

// Iniciar
iniciarServidor();