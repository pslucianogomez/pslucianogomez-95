export interface NowLink {
  label: string;
  href: string;
  note?: { en: string; es: string }; // short context shown under the link
}

export interface NowRow {
  label: string;
  value?: { en: string; es: string } | null;
  items?: NowLink[]; // bullet list of links; expands the row downward
  truncate?: boolean; // single-line with ellipsis instead of wrapping
}

export const now: NowRow[] = [
  { label: 'STATUS',       value: { en: '● FULL_TIME_CONTRACTOR/CONSULTANT', es: '● FULL_TIME_CONTRACTOR/CONSULTOR' }, truncate: true },
  { label: 'LOCATION',     value: { en: 'Córdoba, AR · GMT-3', es: 'Córdoba, AR · GMT-3' } },
  {
    label: 'CURRENTLY',
    items: [
      {
        label: 'farmaciasmartinez.com.ar',
        href: 'https://farmaciasmartinez.com.ar',
        note: { en: 'multi-branch order system · 6 stores · (consultant)', es: 'sistema de pedidos multi-sucursal · 6 sucursales · (consultor)' },
      },
      { label: 'calculoselectricos.com.ar', href: 'https://calculoselectricos.com.ar' },
      {
        label: 'academic.oup.com',
        href: 'https://academic.oup.com',
        note: { en: '(contractor)', es: '(contractor)' },
      },
    ],
  },
];
