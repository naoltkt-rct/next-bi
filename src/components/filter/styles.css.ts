//
import { style, styleVariants } from '@vanilla-extract/css'

//
import { dvw, mq } from '@/styles/mixin'
import { COLORS, LAYOUT } from '@/themes'

export const wrapper = style({
  '@media': {
    ...mq('PC', {
      width: 'max-content',
      marginLeft: 'auto',
      marginRight: 'auto',
    }),
    ...mq('SP', {}),
  },
})

export const container = style({
  '@media': {
    ...mq('PC', {
      display: 'inline-flex',
      justifyContent: 'center',
      columnGap: LAYOUT.PC.gutter,
    }),
    ...mq('TB', {
      columnGap: `${dvw(LAYOUT.PC.gutter)}dvw`,
    }),
    ...mq('SP', {
      border: `2px solid ${COLORS.primary}`,
    }),
  },
})

export const defaultItems = style({
  display: 'block',
  color: COLORS.primary,
  transition: 'opacity 0.3s',
  selectors: {
    '&:hover': {
      opacity: 0.8,
    },
  },
})

export const items = styleVariants({
  default: [defaultItems],
  current: [
    defaultItems,
    {
      fontWeight: 600,
    },
  ],
})

export const refreshIcon = style({
  transition: 'rotate 0.3s',
  '@media': {
    ...mq('PC', {
      marginLeft: LAYOUT.PC.gutter,
    }),
    ...mq('TB', {
      marginLeft: `${dvw(LAYOUT.PC.gutter)}dvw`,
    }),
  },
  selectors: {
    '&:hover': {
      rotate: '225deg',
    },
    '&:disabled': {
      pointerEvents: 'none',
    },
  },
})
