/**
 * Unit tests for evento-loader.ts transformation functions
 */

import {
  createDetailRows,
  createThursdaySpeakers,
  createFridaySpeakers,
  createModerators,
  formatLocation,
  formatWeb,
  mapFilenameToName,
  DEFAULT_EVENTO_DATA
} from './evento-loader';
import type { EventoData, OradorPrincipal } from '../types/evento';

describe('evento-loader transformation functions', () => {
  // Test data based on the actual evento.json structure
  const testEventoData: EventoData = {
    evento: "PRIMER SIMPOSIO AMERICANO Y EUROPEO DE VICTIMOLOGÍA PENAL",
    subtitulo: "Las víctimas de homicidio en contexto de inseguridad",
    fechas: "Jueves 9 y viernes 10 de abril de 2026",
    horario: "15:00 a 19:00 hs",
    ubicacion: "Auditorio del Colegio Público de la Abogacía de Capital Federal (CPACF), Av. Corrientes 1441, CABA",
    web: "www.simposiousinadejusticia.org.ar",
    assets_globales: {
      logo_usina: "logo-usina.png",
      logo_ivujus: "IVUJUS.png",
      logo_colegio: "Colegio_Abogados.png",
      favicon: "favicon_usina.png"
    },
    oradores_principales: [
      { nombre: "IRVIN WALLER", pais: "Canadá", archivo: "waller.webp" },
      { nombre: "MARÍA DE LA LUZ LIMA MALVIDO", pais: "México", archivo: "malvido.webp" },
      { nombre: "MARCELO AEBI", pais: "Argentina-Suiza", archivo: "aebi.webp" },
      { nombre: "DARÍO SOLÍS", pais: "Panamá", archivo: "Dario Solis.webp" }
    ],
    moderadores: [
      { nombre: "MARIANA ROMANO", archivo: "romano.webp" },
      { nombre: "GUSTAVO TOPIC", archivo: "topic.webp" }
    ],
    bloques_jueves: [
      { hora: "15:00", tema: "Apertura", disertantes: ["Ricardo-Gil-lavedra.webp", "Diana_hd.webp", "console.webp", "jimena_1.webp"] },
      { hora: "15:20", tema: "Panel I: Políticas Públicas", disertantes: ["malvido.webp"] },
      { hora: "16:05", tema: "Panel II: Derecho Penal", disertantes: ["castex.webp", "console.webp"] },
      { hora: "16:35", tema: "Panel III: La Ciencia", disertantes: ["roggero.webp", "juarez.webp"] },
      { hora: "17:15", tema: "Panel IV: Datos Genéticos", disertantes: ["slotolow.webp", "bargna.webp"] },
      { hora: "18:00", tema: "Panel V: Defensor de Víctima", disertantes: ["Dario Solis.webp"] }
    ],
    bloques_viernes: [
      { hora: "14:50", tema: "Apertura", disertantes: ["quintana.webp"] },
      { hora: "15:00", tema: "Panel I: Derechos de las Víctimas", disertantes: ["waller.webp"] },
      { hora: "15:45", tema: "Panel II: Política Criminal", disertantes: ["garavano.webp", "casares.webp"] },
      { hora: "16:15", tema: "Panel III: Juicio en Ausencia", disertantes: ["fiumara.webp", "soto.webp"] },
      { hora: "17:10", tema: "Panel IV: Etapa de Ejecución", disertantes: ["peluzzi.webp"] },
      { hora: "17:20", tema: "Panel V: Abolicionismo Penal", disertantes: ["pascua.webp", "jimena_1.webp"] },
      { hora: "17:40", tema: "Panel VI: Criminología Crítica", disertantes: ["aebi.webp"] }
    ]
  };

  describe('createDetailRows', () => {
    it('should transform event data into detail rows', () => {
      const result = createDetailRows(testEventoData);
      
      expect(result).toHaveLength(5);
      expect(result[0]).toEqual({ label: 'Fechas', value: testEventoData.fechas });
      expect(result[1]).toEqual({ label: 'Horario', value: testEventoData.horario });
      expect(result[2].label).toBe('Lugar');
      expect(result[3].label).toBe('Web');
      expect(result[4]).toEqual({ label: 'Entrada', value: 'Actividad no arancelada' });
    });

    it('should format location with newlines', () => {
      const result = createDetailRows(testEventoData);
      const locationRow = result.find(row => row.label === 'Lugar');
      
      expect(locationRow).toBeDefined();
      expect(locationRow?.value).toContain('\n');
    });

    it('should remove protocol from web URL', () => {
      const result = createDetailRows(testEventoData);
      const webRow = result.find(row => row.label === 'Web');
      
      expect(webRow).toBeDefined();
      expect(webRow?.value).not.toMatch(/^https?:\/\//);
      expect(webRow?.value).not.toMatch(/^www\./);
    });
  });

  describe('createThursdaySpeakers', () => {
    it('should extract unique speaker filenames from Thursday blocks', () => {
      const result = createThursdaySpeakers(testEventoData);
      
      // Check that we have the expected number of unique speakers
      const expectedSpeakers = [
        'Ricardo-Gil-lavedra.webp',
        'Diana_hd.webp',
        'console.webp',
        'jimena_1.webp',
        'malvido.webp',
        'castex.webp',
        'roggero.webp',
        'juarez.webp',
        'slotolow.webp',
        'bargna.webp',
        'Dario Solis.webp'
      ];
      
      expect(result).toHaveLength(expectedSpeakers.length);
      
      // Check that all expected filenames are present
      const resultFilenames = result.map(s => s.archivo);
      expectedSpeakers.forEach(filename => {
        expect(resultFilenames).toContain(filename);
      });
    });

    it('should map filenames to names using three-tier algorithm', () => {
      const result = createThursdaySpeakers(testEventoData);
      
      // Check that main speakers get their proper names
      const malvido = result.find(s => s.archivo === 'malvido.webp');
      expect(malvido?.nombre).toBe('MARÍA DE LA LUZ LIMA MALVIDO');
      
      // Check that non-main speakers get generated names
      const gilLavedra = result.find(s => s.archivo === 'Ricardo-Gil-lavedra.webp');
      expect(gilLavedra?.nombre).toBe('RICARDO GIL LAVEDRA'); // Generated from filename
    });
  });

  describe('createFridaySpeakers', () => {
    it('should extract unique speaker filenames from Friday blocks', () => {
      const result = createFridaySpeakers(testEventoData);
      
      // Check that we have the expected number of unique speakers
      const expectedSpeakers = [
        'quintana.webp',
        'waller.webp',
        'garavano.webp',
        'casares.webp',
        'fiumara.webp',
        'soto.webp',
        'peluzzi.webp',
        'pascua.webp',
        'jimena_1.webp',
        'aebi.webp'
      ];
      
      expect(result).toHaveLength(expectedSpeakers.length);
      
      // Check that all expected filenames are present
      const resultFilenames = result.map(s => s.archivo);
      expectedSpeakers.forEach(filename => {
        expect(resultFilenames).toContain(filename);
      });
    });

    it('should map filenames to names using three-tier algorithm', () => {
      const result = createFridaySpeakers(testEventoData);
      
      // Check that main speakers get their proper names
      const waller = result.find(s => s.archivo === 'waller.webp');
      expect(waller?.nombre).toBe('IRVIN WALLER');
      
      // Check that non-main speakers get generated names
      const quintana = result.find(s => s.archivo === 'quintana.webp');
      expect(quintana?.nombre).toBe('QUINTANA'); // Generated from filename
    });
  });

  describe('createModerators', () => {
    it('should transform moderators with newline formatting', () => {
      const result = createModerators(testEventoData);
      
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        archivo: 'romano.webp',
        nombre: 'MARIANA\nROMANO'
      });
      expect(result[1]).toEqual({
        archivo: 'topic.webp',
        nombre: 'GUSTAVO\nTOPIC'
      });
    });

    it('should handle names with multiple spaces correctly', () => {
      const testData = {
        ...testEventoData,
        moderadores: [
          { nombre: "JUAN CARLOS PEREZ", archivo: "test.webp" }
        ]
      };
      
      const result = createModerators(testData);
      expect(result[0].nombre).toBe('JUAN\nCARLOS\nPEREZ');
    });
  });

  describe('formatLocation', () => {
    it('should format CPACF location with newline', () => {
      const input = "Auditorio del Colegio Público de la Abogacía de Capital Federal (CPACF), Av. Corrientes 1441, CABA";
      const result = formatLocation(input);
      
      expect(result).toBe('Auditorio CPACF\nAv. Corrientes 1441, CABA');
    });

    it('should handle non-CPACF locations', () => {
      const input = "Some Other Venue, 123 Main St, City";
      const result = formatLocation(input);
      
      expect(result).toBe('Some Other Venue\n123 Main St\nCity');
    });

    it('should return original string if formatting fails', () => {
      const input = "SimpleLocation";
      const result = formatLocation(input);
      
      expect(result).toBe(input);
    });
  });

  describe('formatWeb', () => {
    it('should remove http:// prefix', () => {
      expect(formatWeb('http://example.com')).toBe('example.com');
    });

    it('should remove https:// prefix', () => {
      expect(formatWeb('https://example.com')).toBe('example.com');
    });

    it('should remove www. prefix', () => {
      expect(formatWeb('www.example.com')).toBe('example.com');
    });

    it('should remove both protocol and www', () => {
      expect(formatWeb('https://www.example.com')).toBe('example.com');
    });

    it('should return clean URLs unchanged', () => {
      expect(formatWeb('example.com')).toBe('example.com');
      expect(formatWeb('subdomain.example.com')).toBe('subdomain.example.com');
    });
  });

  describe('mapFilenameToName', () => {
    const testOradores: OradorPrincipal[] = [
      { nombre: "IRVIN WALLER", pais: "Canadá", archivo: "waller.webp" },
      { nombre: "MARÍA DE LA LUZ LIMA MALVIDO", pais: "México", archivo: "malvido.webp" }
    ];

    it('should return exact match from oradores_principales', () => {
      const result = mapFilenameToName('waller.webp', testOradores);
      expect(result).toBe('IRVIN WALLER');
    });

    it('should generate name from filename when no exact match', () => {
      const result = mapFilenameToName('Ricardo-Gil-lavedra.webp', testOradores);
      expect(result).toBe('RICARDO GIL LAVEDRA');
    });

    it('should handle filenames with underscores', () => {
      const result = mapFilenameToName('diana_hd.webp', testOradores);
      expect(result).toBe('DIANA HD');
    });

    it('should return placeholder for empty generated names', () => {
      const result = mapFilenameToName('.webp', testOradores);
      expect(result).toBe('Orador Jueves');
    });

    it('should handle mixed case filenames', () => {
      const result = mapFilenameToName('Dario Solis.webp', testOradores);
      expect(result).toBe('DARIO SOLIS');
    });
  });

  describe('DEFAULT_EVENTO_DATA', () => {
    it('should have complete default data structure', () => {
      expect(DEFAULT_EVENTO_DATA).toBeDefined();
      expect(DEFAULT_EVENTO_DATA.evento).toBeDefined();
      expect(DEFAULT_EVENTO_DATA.subtitulo).toBeDefined();
      expect(DEFAULT_EVENTO_DATA.fechas).toBeDefined();
      expect(DEFAULT_EVENTO_DATA.horario).toBeDefined();
      expect(DEFAULT_EVENTO_DATA.ubicacion).toBeDefined();
      expect(DEFAULT_EVENTO_DATA.web).toBeDefined();
      expect(DEFAULT_EVENTO_DATA.assets_globales).toBeDefined();
      expect(DEFAULT_EVENTO_DATA.oradores_principales).toBeInstanceOf(Array);
      expect(DEFAULT_EVENTO_DATA.moderadores).toBeInstanceOf(Array);
      expect(DEFAULT_EVENTO_DATA.bloques_jueves).toBeInstanceOf(Array);
      expect(DEFAULT_EVENTO_DATA.bloques_viernes).toBeInstanceOf(Array);
    });
  });
});