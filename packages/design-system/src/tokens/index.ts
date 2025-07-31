export * from './colors';
export * from './spacing';
export * from './typography';
export * from './breakpoints';
export * from './borderRadius';
export * from './shadows';

import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { breakpoints } from './breakpoints';
import { borderRadius } from './borderRadius';
import { shadows } from './shadows';

// Design system configuration
export const designSystem = {
  colors,
  spacing,
  typography,
  breakpoints,
  borderRadius,
  shadows,
} as const; 