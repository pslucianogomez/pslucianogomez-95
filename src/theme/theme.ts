import { colors, space, fontSize, fontFamily, border, shadow, transition } from './tokens';

export const theme = {
  colors,
  space,
  fontSize,
  fontFamily,
  border,
  shadow,
  transition,
} as const;

export type AppTheme = typeof theme;
