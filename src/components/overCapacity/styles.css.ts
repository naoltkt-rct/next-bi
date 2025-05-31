import { convertHexToRgb, mq } from '@/styles/mixin'
import { COLORS, LAYOUT } from '@/themes'
import { style } from '@vanilla-extract/css'

export const container = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  zIndex: 8,
  color: COLORS.error,
  backgroundColor: `rgba(${convertHexToRgb(COLORS.melon)}, 0.9)`,
  border: '2px solid',
  borderColor: `rgba(${convertHexToRgb(COLORS.error)}, 0.9)`,
  borderRadius: 10,
  padding: '0.5em 1em',
  '@media': {
    ...mq('PC', {
      bottom: '1em',
      right: '1em',
    }),
    ...mq('SP', {}),
  },
})

export const items = style({
  display: 'block',
  borderRadius: '50%',
  overflow: 'hidden',
  '@media': {
    ...mq('PC', {
      width: 44,
      height: 44,
      marginLeft: LAYOUT.PC.gutter / 2,
    }),
    ...mq('SP', {
      width: 44,
      height: 44,
      marginLeft: LAYOUT.SP.gutter / 2,
    }),
  },
})
