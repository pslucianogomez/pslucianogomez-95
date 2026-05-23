export interface BootLine {
  text: string;
  delayMs: number;
}

export const bootLines: BootLine[] = [
  { text: '$ pslg.boot --user=visitor --net=mainnet',              delayMs:   60 },
  { text: '> [bios] verifying signature ............... [ok]',     delayMs:  320 },
  { text: '> [bios] integrity hash 0xa9c4...e21f ....... [ok]',    delayMs:  380 },
  { text: '> [kernel] loading kernel.pslg v3.0 ......... [ok]',    delayMs:  440 },
  { text: '> [kernel] mounting /profile.sol ........... [ok]',     delayMs:  600 },
  { text: '> [kernel] mounting /experience.sol ........ [ok]',    delayMs:  660 },
  { text: '> [kernel] mounting /stack.sol ............. [ok]',     delayMs:  720 },
  { text: '> [kernel] mounting /now.sol ............... [ok]',     delayMs:  800 },
  { text: '> [kernel] mounting /contact.sol ........... [ok]',     delayMs: 1340 },
  { text: '> [net] discovering peers (12) ............. [ok]',     delayMs: 1420 },
  { text: '> [net] gossip protocol active ............. [ok]',     delayMs: 1480 },
  { text: '> [net] resolving ENS pslg.eth ............. [ok]',     delayMs: 1840 },
  { text: '> [chain] connecting to mainnet ............ [ok]',     delayMs: 1920 },
  { text: '> [chain] syncing block #847,231 ........... [ok]',    delayMs: 2080 },
  { text: '> [chain] gas oracle: 12 gwei .............. [ok]',     delayMs: 2340 },
  { text: '> [chain] mempool: 24,891 pending ........... [ok]',    delayMs: 2400 },
  { text: '> [vault] loading credentials .............. [ok]',     delayMs: 2480 },
  { text: '> [vault] multisig 2/3 verified ............ [ok]',     delayMs: 2540 },
  { text: '> [trust] verifying POAPs (47/47) .......... [ok]',     delayMs: 3000 },
  { text: '> [trust] checking onchain attestations .... [ok]',    delayMs: 3160 },
  { text: '> [trust] reputation: 0xGM ................. [ok]',     delayMs: 3320 },
  { text: '> [ipfs] pinning to bafybeic7q4... ......... [ok]',     delayMs: 3500 },
  { text: '> [ipfs] fetching avatar ................... [ok]',     delayMs: 3660 },
  { text: '> [shell] hydrating brutalist theme ........ [ok]',     delayMs: 3820 },
  { text: '> [shell] registering routes ............... [ok]',     delayMs: 3980 },
  { text: '> [shell] focus -> primary window .......... [ok]',     delayMs: 4140 },
  { text: '> ready ▮',                                              delayMs: 4340 },
];

export const TOTAL_BOOT_MS = 4800;

// Returning visitors get an abbreviated boot: the first few lines only,
// smaller type, quick fade.
export const COMPACT_LINE_COUNT = 4;
export const COMPACT_BOOT_MS = 1200;
