export const colors = {
  ink:        '#0a0a0a',
  paper:      '#f5f1e8',
  paperSoft:  '#ede7d7',
  inkPaper:   '#fffdf7',
  btc:        '#f7931a',
  btcDeep:    '#d97706',
  muted:      '#6b6b6b',
  ok:         '#2f8f4e',
  warn:       '#b91c1c',
} as const;

export const space = {
  '0': 0, '1': 4, '2': 8, '3': 12, '4': 16,
  '5': 20, '6': 24, '8': 32, '12': 48, '16': 64,
} as const;

export const fontSize = {
  xs: '11px', sm: '13px', md: '15px',
  lg: '20px', xl: '28px', '2xl': '44px',
} as const;

export const fontFamily = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono:    "'JetBrains Mono', ui-monospace, monospace",
  body:    "'Inter', system-ui, sans-serif",
} as const;

export const border = {
  thin:  `2px solid ${colors.ink}`,
  thick: `3px solid ${colors.ink}`,
} as const;

export const shadow = {
  base:   `4px 4px 0 ${colors.ink}`,
  lg:     `6px 6px 0 ${colors.ink}`,
  btc:    `4px 4px 0 ${colors.btc}`,
  focus:  `6px 6px 0 ${colors.btc}`,
  drag:   `8px 8px 0 ${colors.btc}`,
} as const;

export const transition = 'all 80ms steps(4)';

// Cosmetic constants used across the app
export const cosmetic = {
  pseudoAddress: '0x4F…A91C',
  blockBaseline: 800000,
  blockEpoch: Date.UTC(2026, 4, 16, 12, 0, 0), // 2026-05-16T12:00:00Z
  blockTickMs: 12000,
  appVersion: 'v3.0',
} as const;
