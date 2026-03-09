// Script para verificar la carga de datos desde evento.json
const fs = require('fs');
const path = require('path');

// Cargar evento.json
const eventoPath = path.join(__dirname, 'evento.json');
const eventoData = JSON.parse(fs.readFileSync(eventoPath, 'utf8'));

console.log('=== DATOS DE EVENTO.JSON ===\n');

// 1. Verificar assets globales
console.log('Assets Globales:');
console.log('- Logo Usina:', eventoData.assets_globales.logo_usina);
console.log('- Logo IVUJUS:', eventoData.assets_globales.logo_ivujus);
console.log('- Logo Colegio:', eventoData.assets_globales.logo_colegio);
console.log();

// 2. Verificar oradores principales
console.log('Oradores Principales:');
eventoData.oradores_principales.forEach((orador, i) => {
  console.log(`${i + 1}. ${orador.nombre} (${orador.pais}) - ${orador.archivo}`);
});
console.log();

// 3. Verificar oradores de jueves (desde bloques_jueves)
console.log('Oradores Jueves (extraídos de bloques):');
const juevesFilenames = new Set();
eventoData.bloques_jueves.forEach(bloque => {
  bloque.disertantes.forEach(filename => juevesFilenames.add(filename));
});
console.log('Total:', juevesFilenames.size);
console.log('Filenames:', Array.from(juevesFilenames));
console.log();

// 4. Verificar oradores de viernes (desde bloques_viernes)
console.log('Oradores Viernes (extraídos de bloques):');
const viernesFilenames = new Set();
eventoData.bloques_viernes.forEach(bloque => {
  bloque.disertantes.forEach(filename => viernesFilenames.add(filename));
});
console.log('Total:', viernesFilenames.size);
console.log('Filenames:', Array.from(viernesFilenames));
console.log();

// 5. Verificar moderadores
console.log('Moderadores:');
eventoData.moderadores.forEach((moderador, i) => {
  console.log(`${i + 1}. ${moderador.nombre} - ${moderador.archivo}`);
});
console.log();

console.log('=== RESUMEN ===');
console.log(`- Assets: ${Object.keys(eventoData.assets_globales).length}`);
console.log(`- Oradores principales: ${eventoData.oradores_principales.length}`);
console.log(`- Moderadores: ${eventoData.moderadores.length}`);
console.log(`- Bloques jueves: ${eventoData.bloques_jueves.length}`);
console.log(`- Bloques viernes: ${eventoData.bloques_viernes.length}`);
console.log(`- Oradores jueves únicos: ${juevesFilenames.size}`);
console.log(`- Oradores viernes únicos: ${viernesFilenames.size}`);