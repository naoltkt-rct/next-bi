import { COLORS } from '@/themes'
import { style, styleVariants } from '@vanilla-extract/css'

export const defaultButton = style({
  display: 'inline-block',
  lineHeight: 1,
  color: COLORS.primary,
  border: `1px solid ${COLORS.primary}`,
  borderRadius: 9999,
  padding: '0.5em 1em',
  transition: 'background 0.3s',
  selectors: {
    '&:hover': {
      color: 'white',
      backgroundColor: COLORS.primary,
    },
  },
})

export const button = styleVariants({
  default: [defaultButton],
  current: [
    defaultButton,
    {
      color: 'white',
      backgroundColor: COLORS.primary,
    },
  ],
})
