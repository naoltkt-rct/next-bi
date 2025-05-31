//
import { dvfz, fz, mq } from '@/styles/mixin'
import { FONT_COLOR } from '@/themes'
import { style } from '@vanilla-extract/css'

export const body = style({
  color: FONT_COLOR,
  lineHeight: '1.5',
  '@media': {
    ...mq('PC', {
      fontSize: fz(16),
    }),
    ...mq('TB', {
      fontSize: dvfz(16),
    }),
    ...mq('SP', {
      fontSize: fz(14),
    }),
  },
})

export const main = style({
  // maxWidth: '1080px',
  // margin: '0 auto',
})
