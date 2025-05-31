import { convertHexToRgb, dvfz, fz, mq } from '@/styles/mixin'
import { COLORS } from '@/themes'
import { style } from '@vanilla-extract/css'

export const pageTitle = style({
  display: 'block',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: '-1',
  color: `rgba(${convertHexToRgb(COLORS.primary)}, 0.1)`,
  writingMode: 'vertical-rl',
  '@media': {
    ...mq('PC', {
      fontSize: fz(160),
    }),
    ...mq('TB', {
      fontSize: dvfz(160),
    }),
    ...mq('SP', {
      fontSize: fz(80),
    }),
  },
})
