export interface BootLine {
  text: string;
  delayMs: number;
}

export const bootLines: BootLine[] = [
  { text: '$ pslg.boot --user=visitor', delayMs: 80 },
  { text: '> mounting /profile        [ok]', delayMs: 280 },
  { text: '> mounting /experience     [ok]', delayMs: 380 },
  { text: '> mounting /stack          [ok]', delayMs: 480 },
  { text: '> mounting /contact        [ok]', delayMs: 580 },
  { text: '> syncing block            [ok]', delayMs: 680 },
  { text: '> ready ▮', delayMs: 800 },
];

export const TOTAL_BOOT_MS = 2400;
