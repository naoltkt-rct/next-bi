import { mq } from '@/styles/mixin'
import { LAYOUT } from '@/themes'
// import { COLORS } from '@/themes'
import { style } from '@vanilla-extract/css'

export const wrapper = style({
  display: 'flex',
  justifyContent: 'center',
  '@media': {
    ...mq('PC', {
      columnGap: LAYOUT.PC.gutter,
      paddingTop: LAYOUT.PC.gutter,
      paddingBottom: LAYOUT.PC.gutter * 2,
    }),
    ...mq('SP', {
      columnGap: LAYOUT.SP.gutter,
      paddingTop: LAYOUT.SP.gutter,
      paddingBottom: LAYOUT.SP.gutter * 2,
    }),
  },
})

export const items = style({})
