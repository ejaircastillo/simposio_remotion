export interface SpeakerData {
  id: string;
  nombre: string;
  titulo: string;
  cv: string;
  archivo: string;
  dias: ('jueves' | 'viernes')[];
}

export const SPEAKERS: SpeakerData[] = [
  {
    id: 'ricardo-gil-lavedra',
    nombre: 'RICARDO GIL LAVEDRA',
    titulo: 'Presidente del CPACF',
    cv: 'Presidente del Colegio Público de la Abogacía de la Capital Federal (CPACF). Ha sido Conjuez de la Corte Suprema de Justicia de la Nación. Presidente del Consejo Consultivo y Coordinador General del Programa Justicia 2020. Coordinador General de la Mesa de Seguridad Ciudadana del Dialogo Argentino 2003. Ex Ministro de Justicia y Derechos Humanos de la Nación. Juez ad-hoc de la Corte Interamericana de Derechos Humanos. Vicepresidente del Comité contra la Tortura de las Naciones Unidas.',
    archivo: 'Ricardo-Gil-lavedra.webp',
    dias: ['jueves'],
  },
  {
    id: 'diana-cohen-agrest',
    nombre: 'DIANA COHEN AGREST',
    titulo: 'Doctora en Filosofía',
    cv: 'Doctora en Filosofía por la Universidad de Buenos Aires y Magíster de Bioética por la Monash University, Australia. Ex profesora del Departamento de Filosofía de la Facultad de Filosofía y Letras de la UBA. Autora de una decena de ensayos sobre filosofía y ética, entre otros, Ausencia perpetua. Inseguridad y trampas de la (in)justicia (2013). Recibió numerosas distinciones por su labor intelectual y social, entre otros, el Premio Konex de Platino en Ética.',
    archivo: 'Diana_hd.webp',
    dias: ['jueves'],
  },
  {
    id: 'jose-console',
    nombre: 'JOSÉ CONSOLE',
    titulo: 'Abogado Especialista en Derecho Penal',
    cv: 'Abogado. Especialista en Derecho Penal (UCA). Coordinador del Programa de Derechos y Garantías de las Víctimas de Delito y Subdirector del Instituto de Derecho Procesal Penal del Colegio Público de la Abogacía de la Capital Federal (CPACF). Consejero del Colegio Público de la Abogacía de la Capital Federal. Ex Profesor de Derecho Procesal Penal de la Universidad Católica de Salta (UCASAL) y Ex Profesor de Derecho Procesal Penal de la Universidad de Buenos Aires (UBA).',
    archivo: 'console.webp',
    dias: ['jueves'],
  },
  {
    id: 'maria-jimena-molina',
    nombre: 'MARÍA JIMENA MOLINA',
    titulo: 'Abogada',
    cv: 'Abogada (UCALP). Magíster en ética, Filosofía Política y Antropología (TECH España). Especialista en Derecho Penal (UNLP). Diplomada en Libertad de Expresión y Seguridad de Periodistas (Instituto Bonavero de Derechos Humanos, Universidad de Oxford - UNESCO). Diplomada en Liderazgo (Marconi International University). Autora y co-compiladora del libro Nuevos paradigmas para la justicia penal. Hacia una era con perspectiva de víctima (TAEDA 2025).',
    archivo: 'jimena_1.webp',
    dias: ['jueves'],
  },
  {
    id: 'mariana-romano',
    nombre: 'MARIANA ROMANO',
    titulo: 'Abogada',
    cv: 'Abogada (UBA). Diplomada en Derechos Humanos (UA), Ciberdelincuencia y Evidencia Digital (UA y CEU) e Inclusión Social (OEA). Se desempeña en la Justicia Nacional en lo Criminal y Correccional de la República Argentina. Asesora ad honorem del Comisionado para el Monitoreo y Combate del Antisemitismo de la OEA. Diretora de la Comisión de Relaciones Internacionales de la AAJRA. Representante ante la OEA de la Asociación Civil Usina de Justicia.',
    archivo: 'romano.webp',
    dias: ['viernes'],
  },
  {
    id: 'gustavo-topic',
    nombre: 'GUSTAVO TOPIC',
    titulo: 'Abogado',
    cv: 'Abogado. Secretario de la comisión de Defensa del Colegio Público de Abogados CABA. Secretario del Programa de Víctimas de Delitos dependiente de la Secretaria General del CPACF. Relator designado por el CPACF por ante la Inspección General de Justicia dependiente del Ministerio de Justicia de la Nación. Miembro Fundador del Observatorio de Víctimas de Falsas Denuncias de Delitos contra la integridad Sexual.',
    archivo: 'topic.webp',
    dias: ['viernes'],
  },
  {
    id: 'maria-de-la-luz-lima-malvido',
    nombre: 'MARÍA DE LA LUZ LIMA MALVIDO',
    titulo: 'Doctora en Derecho',
    cv: 'Abogada. Especialista en Ciencias Penales. Doctora Magna Cum Laude en Derecho (UNAM). Certificada en estudios de Terrorismo (SAU) y en Negociación de Rehenes del FBI. Miembro de la Academia Mexicana de Ciencias Penales. Fundadora de la Sociedad Mexicana de Criminología y Presidenta Honoraria de la Sociedad Mexicana de Victimología. Profesora universitaria e investigadora.',
    archivo: 'malvido.webp',
    dias: ['jueves'],
  },
  {
    id: 'francisco-castex',
    nombre: 'FRANCISCO CASTEX',
    titulo: 'Abogado y Doctor',
    cv: 'Abogado, graduado con honores en la Universidad de Buenos Aires (UBA). Doctor en derecho (UBA). Profesor de grado y de posgrado (UBA, UCEMA). Expositor y coordinador de congresos sobre derecho penal y procesal. Oficial del Business Crime Committee de la International Bar Association. Ha escrito numerosos artículos en el ámbito nacional e internacional, entre los que se destaca Responsabilidad penal de las personas jurídicas (RPJ) y compliance.',
    archivo: 'castex.webp',
    dias: ['jueves'],
  },
  {
    id: 'daniel-roggero',
    nombre: 'DANIEL ROGGERO',
    titulo: 'Abogado',
    cv: 'Abogado (UBA). Licenciado en Comunicación Social (USAL) y en Psicología Social (UAJFK). Profesor de Ciencia Política (UCES). Director de la Revista IIDOS. Autor del Manual de Derechos Humanos y Garantías de las Personas Víctimas de Delito. Creador del Índice Legislativo de Usina de Justicia (IUJ). Consejero académico del Instituto de Victimología de Usina de Justicia.',
    archivo: 'roggero.webp',
    dias: ['jueves'],
  },
  {
    id: 'noelia-marelyn-juarez',
    nombre: 'NOELIA MARELYN JUAREZ',
    titulo: 'Abogada',
    cv: 'Abogada (UNLaM). Secretaria General de Usina de Justicia y del Instituto de Victimología de Usina de Justicia. Capacitada en derecho constitucional y administrativo. Ha realizado publicaciones académicas y periodísticas relacionadas a la materia penal.',
    archivo: 'juarez.webp',
    dias: ['jueves'],
  },
  {
    id: 'raquel-slotolow',
    nombre: 'RAQUEL SLOTOLOW',
    titulo: 'Abogada',
    cv: 'Ex Juez en lo Correccional del Departamento Judicial Zárate-Campana. Secretaria de Primera Instancia en lo Criminal y Correccional. Abogada de la UBA. Posgrado de Especialización en Derecho Penal en USAL. Miembro de Usina de Justicia.',
    archivo: 'slotolow.webp',
    dias: ['jueves'],
  },
  {
    id: 'guillermo-bargna',
    nombre: 'GUILLERMO BARGNA',
    titulo: 'Analista de Sistemas',
    cv: 'Analista de Sistemas. Miembro del Observatorio de Víctimas de la Honorable Cámara de Diputados de la Nación y de Usina de Justicia. También ha sido miembro del Observatorio de Víctimas en el Ministerio de Justicia y Derechos Humanos de la Nación. Ha participado como familiar de víctima en capacitaciones, debates Parlamentarios, diversos programas televisivos y radiales, y notas en la prensa escrita.',
    archivo: 'bargna.webp',
    dias: ['jueves'],
  },
  {
    id: 'dario-solis',
    nombre: 'DARÍO SOLÍS',
    titulo: 'Abogado',
    cv: 'Abogado panameño. Especializado en criminalística, derecho y ciencias políticas, derecho procesal penal, sistema penal acusatorio, victimología y derechos humanos. Su formación académica fue desarrollada en universidades de Panamá, Centroamérica y Europa. Profesor, conferencista y administrador con amplia experiencia en comercio internacional. Defensor Público de Víctimas.',
    archivo: 'Dario Solis.webp',
    dias: ['jueves'],
  },
  {
    id: 'francisco-quintana',
    nombre: 'FRANCISCO QUINTANA',
    titulo: 'Abogado',
    cv: 'Abogado, recibido con diploma de honor en la Universidad Católica Argentina (UCA). Fue dos veces legislador de la Ciudad de Buenos Aires. Durante sus últimos dos años en la Casa Legislativa (2018-2019) desempeñó el cargo de Vicepresidente 1º. En el período 2016 y 2017 fue primero jefe del bloque PRO y posteriormente del interbloque Vamos Juntos.',
    archivo: 'quintana.webp',
    dias: ['viernes'],
  },
  {
    id: 'irvin-waller',
    nombre: 'IRVIN WALLER',
    titulo: 'Doctor en Criminología y Derecho',
    cv: 'Autor de "Ciencia y Secretos para Acabar con los Delitos Violentos", entre otros. Presidente del Consejo Asesor de la Fundación para el Estudio de la Seguridad y la Gobernanza. Ha sido uno de los autores de "Declaración sobre los principios fundamentales de justicia para las víctimas de delitos y del abuso de poder" (ONU 1985). Ha recibido numerosos premios por sus contribuciones a la prevención del delito y los derechos de las víctimas.',
    archivo: 'waller.webp',
    dias: ['viernes'],
  },
  {
    id: 'german-garavano',
    nombre: 'GERMÁN GARAVANO',
    titulo: 'Abogado y Consultor',
    cv: 'Abogado y consultor. Fue Ministro de Justicia y Derechos Humanos de la Nación. Ex Fiscal general. Ha sido Consejero del Consejo de la Magistratura y Juez de la Ciudad de Buenos Aires. También ha sido miembro del Consejo Directivo del Centro de Estudios de Justicia para las Américas (CEJA), organismo dependiente de la OEA. Escribió decenas de artículos y libros sobre justicia.',
    archivo: 'Garavano.webp',
    dias: ['viernes'],
  },
  {
    id: 'martin-casares',
    nombre: 'MARTÍN CASARES',
    titulo: 'Abogado y Magíster en Derecho Penal',
    cv: 'Abogado, Magíster en Derecho Penal. Secretario General del Colegio Público de Abogados de Capital Federal. Consultor en política criminal y justicia penal. Ha sido Subsecretario de Política Criminal del Ministerio de Justicia y Derechos Humanos de la Nación. Fue becario del Programa Interamericano de Formación de Capacitadores para la Reforma Procesal Penal del Centro de Estudios de Justicia para las Américas (CEJA).',
    archivo: 'casares.webp',
    dias: ['viernes'],
  },
  {
    id: 'franco-fiumara',
    nombre: 'FRANCO FIUMARA',
    titulo: 'Juez',
    cv: 'Juez en lo Criminal. Doctor en Ciencias Jurídicas y en Ciencias Políticas. Magister en Derecho y Relaciones Internacionales. Becario y profesor invitado de Yad Vashem (Israel). Condecorado como Ufficiale della Ordine della Stella d Italia. Profesor benemérito de la Universidad Aldo Moro de Bari, Italia. Docente de grado y posgrado, investigador, consejesor y coordinador del Doctorado de Ciencias Jurídicas de UNLaM.',
    archivo: 'fiumara.webp',
    dias: ['viernes'],
  },
  {
    id: 'fernando-soto',
    nombre: 'FERNANDO SOTO',
    titulo: 'Abogado',
    cv: 'Abogado egresado de la Universidad de Buenos Aires, apoderado legal de la Asociación Civil Usina de Justicia. Fue Director Nacional de Proyectos, Evaluación de Normas y Cooperación Legislativa del Ministerio Seguridad de la Nación. Ex Profesor Adjunto de Derecho Penal en la Universidad de Buenos Aires y actual profesor de Derecho Procesal II en el Instituto Universitario de la Policía Federal Argentina.',
    archivo: 'soto.webp',
    dias: ['viernes'],
  },
  {
    id: 'marcelo-peluzzi',
    nombre: 'MARCELO PELUZZI',
    titulo: 'Juez Nacional de Ejecución Penal',
    cv: 'Juez Nacional de Ejecución Penal. Docente de la Escuela Judicial del Consejo de la Magistratura de la Nación.',
    archivo: 'peluzzi.webp',
    dias: ['viernes'],
  },
  {
    id: 'francisco-javier-pascua',
    nombre: 'FRANCISCO JAVIER PASCUA',
    titulo: 'Abogado y Magistrado',
    cv: 'Abogado (UNC), magistrado, consultor, capacitador y doctrinario. Magister en Criminología (UDA). Jefe de Unidades Fiscales de Investigación y de Juicio Oral (Mendoza). Profesor de grado y de posgrado. Fundador y Director del Grupo Diálogo y Debate. Capacitador del área de Capacitación penal, procesal y de litigación oral del Ministerio Público Fiscal de la provincia de Mendoza.',
    archivo: 'pascua.webp',
    dias: ['viernes'],
  },
  {
    id: 'marcelo-aebi',
    nombre: 'MARCELO AEBI',
    titulo: 'Ph.D. Catedrático de Criminología',
    cv: 'Ph.D. Catedrático de Criminología en la Facultad de Ciencias Penales de la Universidad de Lausana (Suiza). Secretario General de la Sociedad Europea de Criminología. Es responsable de las Estadísticas Penales Anuales del Consejo de Europa (SPACE), jefe del grupo de expertos que elabora el Libro de Fuentes Europeo de Estadísticas de Delincuencia y Justicia Penal, y secretario ejecutivo de la Sociedad Europea de Criminología.',
    archivo: 'aebi.webp',
    dias: ['viernes'],
  },
];

export function getSpeakerById(id: string): SpeakerData | undefined {
  return SPEAKERS.find(s => s.id === id);
}

export function getSpeakersByDay(day: 'jueves' | 'viernes'): SpeakerData[] {
  return SPEAKERS.filter(s => s.dias.includes(day));
}