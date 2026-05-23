export interface BootLine {
  text: string;
  delayMs: number;
}

export const bootLines: BootLine[] = [
  { text: '$ pslg.boot --user=visitor --net=mainnet',           delayMs:   60 },
  { text: '> [bios] verifying signature ............... [ok]',  delayMs:  240 },
  { text: '> [kernel] mounting /profile.sol ........... [ok]',  delayMs:  420 },
  { text: '> [kernel] mounting /experience.sol ........ [ok]',  delayMs:  600 },
  { text: '> [kernel] mounting /stack.sol ............. [ok]',  delayMs:  780 },
  { text: '> [kernel] mounting /now.sol ............... [ok]',  delayMs:  960 },
  { text: '> [kernel] mounting /contact.sol ........... [ok]',  delayMs: 1140 },
  { text: '> [net] resolving ENS pslg.eth ............. [ok]',  delayMs: 1340 },
  { text: '> [chain] syncing block #847,231 ........... [ok]',  delayMs: 1540 },
  { text: '> [chain] gas oracle: 12 gwei .............. [ok]',  delayMs: 1720 },
  { text: '> [vault] loading credentials .............. [ok]',  delayMs: 1920 },
  { text: '> [trust] verifying POAPs (47/47) .......... [ok]',  delayMs: 2120 },
  { text: '> [trust] reputation: 0xGM ................. [ok]',  delayMs: 2320 },
  { text: '> [ipfs] fetching avatar bafybeic... ....... [ok]',  delayMs: 2520 },
  { text: '> [shell] hydrating brutalist theme ........ [ok]',  delayMs: 2720 },
  { text: '> [shell] focus -> primary window .......... [ok]',  delayMs: 2920 },
  { text: '> ready ▮',                                          delayMs: 3120 },
];

export const TOTAL_BOOT_MS = 3600;
