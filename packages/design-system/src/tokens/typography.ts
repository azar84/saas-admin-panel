export const typography = {
  // Font families - these will be set by the design system service
  fontFamily: {
    sans: ['var(--font-family-sans)', 'system-ui', 'sans-serif'],
    mono: ['var(--font-family-mono)', 'monospace'],
  },
  
  // Font sizes - these will be set by the design system service
  fontSize: {
    xs: 'var(--font-size-xs, 0.75rem)',    // 12px
    sm: 'var(--font-size-sm, 0.875rem)',   // 14px
    base: 'var(--font-size-base, 1rem)',     // 16px
    lg: 'var(--font-size-lg, 1.125rem)',   // 18px
    xl: 'var(--font-size-xl, 1.25rem)',    // 20px
    '2xl': 'var(--font-size-2xl, 1.5rem)',  // 24px
    '3xl': 'var(--font-size-3xl, 1.875rem)', // 30px
    '4xl': 'var(--font-size-4xl, 2.25rem)',  // 36px
    '5xl': 'var(--font-size-5xl, 3rem)',     // 48px
    '6xl': 'var(--font-size-6xl, 3.75rem)',  // 60px
    '7xl': 'var(--font-size-7xl, 4.5rem)',   // 72px
    '8xl': 'var(--font-size-8xl, 6rem)',     // 96px
    '9xl': 'var(--font-size-9xl, 8rem)',     // 128px
  },
  
  // Font weights - these will be set by the design system service
  fontWeight: {
    thin: 'var(--font-weight-thin, 100)',
    extralight: 'var(--font-weight-extralight, 200)',
    light: 'var(--font-weight-light, 300)',
    normal: 'var(--font-weight-normal, 400)',
    medium: 'var(--font-weight-medium, 500)',
    semibold: 'var(--font-weight-semibold, 600)',
    bold: 'var(--font-weight-bold, 700)',
    extrabold: 'var(--font-weight-extrabold, 800)',
    black: 'var(--font-weight-black, 900)',
  },
  
  // Line heights - these will be set by the design system service
  lineHeight: {
    none: 'var(--line-height-none, 1)',
    tight: 'var(--line-height-tight, 1.25)',
    snug: 'var(--line-height-snug, 1.375)',
    normal: 'var(--line-height-normal, 1.5)',
    relaxed: 'var(--line-height-relaxed, 1.625)',
    loose: 'var(--line-height-loose, 2)',
  },
  
  // Letter spacing - these will be set by the design system service
  letterSpacing: {
    tighter: 'var(--letter-spacing-tighter, -0.05em)',
    tight: 'var(--letter-spacing-tight, -0.025em)',
    normal: 'var(--letter-spacing-normal, 0em)',
    wide: 'var(--letter-spacing-wide, 0.025em)',
    wider: 'var(--letter-spacing-wider, 0.05em)',
    widest: 'var(--letter-spacing-widest, 0.1em)',
  },
} as const;

export type FontSizeToken = keyof typeof typography.fontSize;
export type FontWeightToken = keyof typeof typography.fontWeight;
export type LineHeightToken = keyof typeof typography.lineHeight;
export type LetterSpacingToken = keyof typeof typography.letterSpacing; 