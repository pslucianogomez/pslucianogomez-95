// Each game preview is an ambient terminal scene (honeytree-style): a chunky
// pixel-art scene over a dark background plus a status line
// "name · count · time · [bar] next: x".
//
// pixels: rows of single-char cells mapped through PALETTE in Now.tsx.
// '.' (or any unmapped char) = transparent.

export interface ComingSoonGame {
  exe: string;                          // CMD window title
  name: string;                         // status-line name
  count: { en: string; es: string };    // "3 cebadas"
  time: { en: string; es: string };     // "1 día"
  next: string;                         // upcoming unlock
  progress: number;                     // 0..1 status bar fill
  pixels: string[];
  image?: string;                       // optional real screenshot (overrides pixels)
}

const SCENE_W = 26;
const padRow = (s: string) => (s + '.'.repeat(SCENE_W)).slice(0, SCENE_W);

// --- MATE scene: Argentine flag (celeste/white/celeste + sun) beside a
//     wooden gourd with a silver rim, green yerba and an angled bombilla. ---
const flag = [
  '...........',
  'LLLLLLLLLLL',
  'LLLLLLLLLLL',
  'wwwwwwwwwww',
  'wwwwwYwwwww',
  'wwwwwwwwwww',
  'LLLLLLLLLLL',
  'LLLLLLLLLLL',
  '...........',
  '...........',
];
const mateGourd = [
  '.........',
  '......S..',
  '.....S...',
  '....SS...',
  '.SSSSSSS.',
  '.SGGGGGS.',
  '.AAAAAAA.',
  '.AAAAAAA.',
  '..AAAAA..',
  '...aSa...',
];
const mateScene = [
  ...flag.map((f, i) => padRow(`${f}...${mateGourd[i]}`)),
  'B'.repeat(SCENE_W),
  'k'.repeat(SCENE_W),
];

export const games: ComingSoonGame[] = [
  {
    exe: 'MATE.EXE',
    name: 'mate',
    count: { en: '3 rounds', es: '3 cebadas' },
    time: { en: '1 day', es: '1 día' },
    next: 'tereré',
    progress: 0.4,
    pixels: mateScene,
  },
  {
    exe: 'GAUCHO.EXE',
    name: 'gaucho',
    count: { en: '1240 m', es: '1240 m' },
    time: { en: '1 day', es: '1 día' },
    next: 'facón',
    progress: 0.6,
    pixels: [
      '.......................YY.',
      '.......................YY.',
      '....GG....................',
      '...GGGG......kk...........',
      '...GGGG.....kkkk..k.......',
      '....WW......kkkkkkkk......',
      '....WW.......k..kk.k......',
      'gggggggggggggggggggggggggg',
      'gggggggggggggggggggggggggg',
      'kkkkkkkkkkkkkkkkkkkkkkkkkk',
      'kkkkkkkkkkkkkkkkkkkkkkkkkk',
    ],
  },
  {
    exe: 'TRUCO.EXE',
    name: 'truco',
    count: { en: '22 pts', es: '22 pts' },
    time: { en: '1 day', es: '1 día' },
    next: 'envido',
    progress: 0.73,
    pixels: [
      '..........................',
      '...CCCC...CCCC...CCCC......',
      '...CRRC...CRRC...CRRC......',
      '...CCCC...CCCC...CCCC......',
      '...CRRC...CRRC...CRRC......',
      '...CCCC...CCCC...CCCC......',
      '..........................',
      'BBBBBBBBBBBBBBBBBBBBBBBBBBB',
      'BBBBBBBBBBBBBBBBBBBBBBBBBBB',
      'kkkkkkkkkkkkkkkkkkkkkkkkkkk',
      'kkkkkkkkkkkkkkkkkkkkkkkkkkk',
    ],
  },
  {
    exe: 'ASADO.SIM',
    name: 'asado',
    count: { en: '4 cuts', es: '4 cortes' },
    time: { en: '1 day', es: '1 día' },
    next: 'provoleta',
    progress: 0.5,
    pixels: [
      '..........................',
      '...MM....MMM....MM...MMM...',
      '..MMMM..MMMMM..MMMM.MMMMM..',
      'SSSSSSSSSSSSSSSSSSSSSSSSSSS',
      '...O.R...O.R....O.R..O.R...',
      '..OROR..OROR...OROR.OROR...',
      '..YOY...YOY....YOY..YOY....',
      '..........................',
      'kkkkkkkkkkkkkkkkkkkkkkkkkkk',
      'kkkkkkkkkkkkkkkkkkkkkkkkkkk',
      'kkkkkkkkkkkkkkkkkkkkkkkkkkk',
    ],
  },
];
