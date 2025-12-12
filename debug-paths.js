// debug-paths.js
// Crea este archivo en la raíz de tu proyecto para verificar las rutas

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('==========================================');
console.log('🔍 VERIFICACIÓN DE RUTAS');
console.log('==========================================\n');

// Mostrar ruta base
console.log('📁 Directorio base del proyecto:');
console.log(__dirname);
console.log('\n');

// Verificar carpeta CSS
const cssPath = path.join(__dirname, 'CSS');
console.log('📁 Ruta de CSS:');
console.log(cssPath);
console.log('¿Existe?', fs.existsSync(cssPath) ? '✅ SÍ' : '❌ NO');

if (fs.existsSync(cssPath)) {
    console.log('\n📄 Archivos en CSS/:');
    const cssFiles = fs.readdirSync(cssPath);
    cssFiles.forEach(file => {
        const fullPath = path.join(cssPath, file);
        const isDir = fs.statSync(fullPath).isDirectory();
        console.log(`  ${isDir ? '📁' : '📄'} ${file}`);
        
        // Si es directorio, mostrar contenido
        if (isDir) {
            const subFiles = fs.readdirSync(fullPath);
            subFiles.forEach(subFile => {
                console.log(`     📄 ${subFile}`);
            });
        }
    });
}
console.log('\n');

// Verificar archivos específicos
const filesToCheck = [
    'CSS/navbar.css',
    'CSS/footer.css',
    'CSS/appear.css',
    'CSS/INICIO/inicio.css',
    'CSS/INICIO/circles.css',
    'CSS/INICIO/acercaDe.css',
    'CSS/INICIO/tecnologias.css',
    'CSS/LOGIN/login.css',
    'CSS/REGISTRO/registro.css',
    'hornet (1).png',
    'DATABASE/app.js'
];

console.log('🔎 Verificando archivos específicos:\n');
filesToCheck.forEach(file => {
    const fullPath = path.join(__dirname, file);
    const exists = fs.existsSync(fullPath);
    console.log(`${exists ? '✅' : '❌'} ${file}`);
    if (!exists) {
        console.log(`   Buscando en: ${fullPath}`);
    }
});

console.log('\n==========================================');
console.log('🎯 ESTRUCTURA ESPERADA VS ACTUAL');
console.log('==========================================\n');

console.log('La estructura debería ser:');
console.log('CARRITO COMPRAS/');
console.log('├── CSS/');
console.log('│   ├── navbar.css');
console.log('│   ├── footer.css');
console.log('│   ├── appear.css');
console.log('│   ├── INICIO/');
console.log('│   │   ├── inicio.css');
console.log('│   │   ├── circles.css');
console.log('│   │   ├── acercaDe.css');
console.log('│   │   └── tecnologias.css');
console.log('│   ├── LOGIN/');
console.log('│   │   └── login.css');
console.log('│   └── REGISTRO/');
console.log('│       └── registro.css');
console.log('├── HTML/');
console.log('│   ├── index.html');
console.log('│   ├── login.html');
console.log('│   └── registro.html');
console.log('├── DATABASE/');
console.log('│   └── app.js');
console.log('├── hornet (1).png');
console.log('└── app.js');
console.log('\n==========================================');