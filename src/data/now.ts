export interface NowLink {
  label: string;
  href: string;
  role?: { en: string; es: string }; // inline next to the link, same type, e.g. "(consultor)"
  note?: { en: string; es: string }; // optional description shown dimmed under the link
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
        label: 'calculoselectricos.com.ar',
        href: 'https://calculoselectricos.com.ar',
        role: { en: '(own product)', es: '(producto propio)' },
      },
      {
        label: 'farmaciasmartinez.com.ar',
        href: 'https://farmaciasmartinez.com.ar',
        role: { en: '(consultant)', es: '(consultor)' },
        note: { en: 'multi-branch order system · 6 stores', es: 'sistema de pedidos multi-sucursal · 6 sucursales' },
      },
      {
        label: 'academic.oup.com',
        href: 'https://academic.oup.com',
        role: { en: '(contractor)', es: '(contractor)' },
      },
    ],
  },
];
