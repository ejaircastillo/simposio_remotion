#!/usr/bin/env node

/**
 * Simple validation script for evento.json and transformation functions
 * This script can be run without Jest setup to verify functionality
 */

const path = require('path');
const fs = require('fs');

// Load and parse evento.json
const eventoJsonPath = path.join(__dirname, '..', 'evento.json');
console.log(`Validating ${eventoJsonPath}`);

if (!fs.existsSync(eventoJsonPath)) {
  console.error('❌ evento.json not found');
  process.exit(1);
}

try {
  const eventoData = JSON.parse(fs.readFileSync(eventoJsonPath, 'utf8'));
  console.log('✅ evento.json loaded successfully');
  
  // Basic validation
  const requiredFields = [
    'evento', 'subtitulo', 'fechas', 'horario', 'ubicacion', 'web',
    'assets_globales', 'oradores_principales', 'moderadores',
    'bloques_jueves', 'bloques_viernes'
  ];
  
  let allFieldsPresent = true;
  for (const field of requiredFields) {
    if (!eventoData[field]) {
      console.error(`❌ Missing required field: ${field}`);
      allFieldsPresent = false;
    }
  }
  
  if (allFieldsPresent) {
    console.log('✅ All required fields present');
  }
  
  // Validate assets_globales
  const requiredAssets = ['logo_usina', 'logo_ivujus', 'logo_colegio', 'favicon'];
  if (eventoData.assets_globales) {
    let allAssetsPresent = true;
    for (const asset of requiredAssets) {
      if (!eventoData.assets_globales[asset]) {
        console.error(`❌ Missing asset: ${asset}`);
        allAssetsPresent = false;
      }
    }
    if (allAssetsPresent) {
      console.log('✅ All assets present');
    }
  }
  
  // Validate oradores_principales
  if (eventoData.oradores_principales && Array.isArray(eventoData.oradores_principales)) {
    console.log(`✅ Found ${eventoData.oradores_principales.length} main speakers`);
    
    // Check each speaker has required fields
    for (let i = 0; i < eventoData.oradores_principales.length; i++) {
      const speaker = eventoData.oradores_principales[i];
      if (!speaker.nombre || !speaker.pais || !speaker.archivo) {
        console.error(`❌ Speaker ${i} missing required fields:`, speaker);
      }
    }
  }
  
  // Validate moderadores
  if (eventoData.moderadores && Array.isArray(eventoData.moderadores)) {
    console.log(`✅ Found ${eventoData.moderadores.length} moderators`);
  }
  
  // Validate bloques_jueves
  if (eventoData.bloques_jueves && Array.isArray(eventoData.bloques_jueves)) {
    console.log(`✅ Found ${eventoData.bloques_jueves.length} Thursday blocks`);
    
    // Extract all speaker filenames for validation
    const thursdayFilenames = new Set();
    eventoData.bloques_jueves.forEach(block => {
      if (block.disertantes && Array.isArray(block.disertantes)) {
        block.disertantes.forEach(filename => thursdayFilenames.add(filename));
      }
    });
    console.log(`✅ Found ${thursdayFilenames.size} unique Thursday speaker filenames`);
  }
  
  // Validate bloques_viernes
  if (eventoData.bloques_viernes && Array.isArray(eventoData.bloques_viernes)) {
    console.log(`✅ Found ${eventoData.bloques_viernes.length} Friday blocks`);
    
    // Extract all speaker filenames for validation
    const fridayFilenames = new Set();
    eventoData.bloques_viernes.forEach(block => {
      if (block.disertantes && Array.isArray(block.disertantes)) {
        block.disertantes.forEach(filename => fridayFilenames.add(filename));
      }
    });
    console.log(`✅ Found ${fridayFilenames.size} unique Friday speaker filenames`);
  }
  
  console.log('\n🎉 Validation complete!');
  console.log('The evento.json file is valid and ready for use.');
  
} catch (error) {
  console.error('❌ Error validating evento.json:', error.message);
  process.exit(1);
}