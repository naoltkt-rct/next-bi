/**
 *
 */
export const WIDTH_PC = 1080 as const
export const WIDTH_SP = 768 as const

export const LAYOUT = {
  PC: {
    // root: 60,
    container: WIDTH_PC,
    inner: 1000,
    gutter: 40,
  },
  SP: {
    // root: 60,
    container: 375,
    inner: 335,
    gutter: 20,
  },
} as const

/**
 *
 */
export const BREAKPOINTS = {
  SP: `screen and (max-width: ${WIDTH_SP - 1}px)`,
  PC: `screen and (min-width: ${WIDTH_SP}px)`,
  TB: `screen and (min-width: ${WIDTH_SP}px) and (max-width: ${WIDTH_PC}px)`,
  XL: `screen and (min-width: ${WIDTH_PC + 1}px)`,
} as const
