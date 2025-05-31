//
import { createVar, style, styleVariants } from '@vanilla-extract/css'

//
import { dvw, mq } from '@/styles/mixin'
import { COLORS, LAYOUT } from '@/themes'

export const itemsDefaultWidth = 140
export const itemsFixedWidthPC = createVar()
export const itemsFixedWidthTB = createVar()

export const wrapper = style({
  display: 'flex',
  columnGap: LAYOUT.PC.gutter,
  color: COLORS.primary,
  paddingBottom: '1em',
  '@media': {
    ...mq('PC', {
      columnGap: LAYOUT.PC.gutter,
    }),
    ...mq('TB', {
      columnGap: `${dvw(LAYOUT.PC.gutter)}dvw`,
    }),
    ...mq('SP', {
      columnGap: LAYOUT.SP.gutter,
    }),
  },
})

export const defaultItems = style({
  display: 'block',
  textAlign: 'center',
  '@media': {
    ...mq('PC', {
      width: itemsDefaultWidth,
      paddingLeft: LAYOUT.PC.gutter / 2,
      paddingRight: LAYOUT.PC.gutter / 2,
    }),
    ...mq('TB', {
      width: `${dvw(itemsDefaultWidth)}dvw`,
      paddingLeft: `${dvw(LAYOUT.PC.gutter / 2)}dvw`,
      paddingRight: `${dvw(LAYOUT.PC.gutter / 2)}dvw`,
    }),
  },
})

export const items = styleVariants({
  default: [defaultItems],
  fixed: [
    defaultItems,
    {
      textAlign: 'left',
      '@media': {
        ...mq('PC', {
          width: itemsFixedWidthPC,
        }),
        ...mq('TB', {
          width: itemsFixedWidthTB,
        }),
      },
    },
  ],
  current: [defaultItems, { fontWeight: 600 }],
})

export const arrows = style({
  display: 'inline-block',
  marginLeft: '0.25em',
})
