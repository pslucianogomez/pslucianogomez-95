export interface NowRow {
  label: string;
  value: { en: string; es: string } | null;
  truncate?: boolean; // single-line with ellipsis instead of wrapping
}

export const now: NowRow[] = [
  { label: 'STATUS',       value: { en: '● FULL_TIME_CONTRACTOR/CONSULTANT', es: '● FULL_TIME_CONTRACTOR/CONSULTOR' }, truncate: true },
  { label: 'LOCATION',     value: { en: 'Córdoba, AR · GMT-3', es: 'Córdoba, AR · GMT-3' } },
  { label: 'CURRENTLY',    value: { en: 'Redesigning this site (meta)', es: 'Rediseñando este sitio (meta)' } },
  { label: 'LAST COMMIT',  value: { en: 'pslucianogomez.com.ar', es: 'pslucianogomez.com.ar' } },
  { label: 'LISTENING TO', value: null },
  { label: 'READING',      value: null },
  { label: 'UPDATED',      value: { en: '2026-05-23', es: '2026-05-23' } },
];
