import styled from 'styled-components';

import User from '../assets/icons/user.svg?react';
import Briefcase from '../assets/icons/briefcase.svg?react';
import Mail from '../assets/icons/mail.svg?react';
import Box from '../assets/icons/box.svg?react';
import Pulse from '../assets/icons/pulse.svg?react';
import Terminal from '../assets/icons/terminal.svg?react';
import Hex from '../assets/icons/hex.svg?react';

export type GlyphName =
  | 'user' | 'briefcase' | 'mail' | 'box' | 'pulse' | 'terminal' | 'hex';

const map = { user: User, briefcase: Briefcase, mail: Mail, box: Box, pulse: Pulse, terminal: Terminal, hex: Hex };

const Wrap = styled.span<{ $size: number }>`
  display: inline-flex;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  & > svg { width: 100%; height: 100%; }
`;

export const Glyph = ({ name, size = 24 }: { name: GlyphName; size?: number }) => {
  const Cmp = map[name];
  return <Wrap $size={size}><Cmp /></Wrap>;
};
