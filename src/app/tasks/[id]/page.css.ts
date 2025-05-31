import { mq } from '@/styles/mixin'
import { LAYOUT } from '@/themes'
import { STATUS_COLOR } from '@/themes'
import { style, styleVariants } from '@vanilla-extract/css'

export const wrapper = style({
  '@media': {
    ...mq('PC', {
      paddingTop: LAYOUT.PC.gutter,
      paddingBottom: LAYOUT.PC.gutter,
    }),
    ...mq('SP', {
      paddingTop: LAYOUT.SP.gutter,
      paddingBottom: LAYOUT.SP.gutter,
    }),
  },
})

export const informationBlocks = style({
  display: 'flex',
  '@media': {
    ...mq('PC', {
      columnGap: LAYOUT.PC.gutter / 2,
      marginBottom: '1em',
    }),
    ...mq('SP', {
      columnGap: LAYOUT.SP.gutter / 2,
      marginBottom: '1em',
    }),
  },
})

export const informationDescription = style({
  '@media': {
    ...mq('PC', {
      marginBottom: LAYOUT.PC.gutter,
    }),
    ...mq('SP', {
      marginBottom: LAYOUT.SP.gutter,
    }),
  },
})

export const backToTop = style({
  display: 'block',
  textAlign: 'center',
  '@media': {
    ...mq('PC', {
      paddingTop: LAYOUT.PC.gutter,
    }),
    ...mq('SP', {
      paddingTop: LAYOUT.SP.gutter,
    }),
  },
})

export const taskLegends = style({
  display: 'flex',
  alignItems: 'center',
  '@media': {
    ...mq('PC', {
      columnGap: LAYOUT.PC.gutter / 2,
      paddingTop: LAYOUT.PC.gutter / 2,
    }),
    ...mq('SP', {
      columnGap: LAYOUT.SP.gutter / 2,
      paddingTop: LAYOUT.SP.gutter / 2,
    }),
  },
})

export const taskLegendsItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  columnGap: '0.5em',
})

export const defaultTaskLegendsLabel = style({
  display: 'inline-block',
  width: '2em',
  height: '1.25em',
})

export const taskLegendsLabel = styleVariants({
  waiting: [defaultTaskLegendsLabel, { backgroundColor: STATUS_COLOR.waiting }],
  processing: [defaultTaskLegendsLabel, { backgroundColor: STATUS_COLOR.processing }],
  completed: [defaultTaskLegendsLabel, { backgroundColor: STATUS_COLOR.completed }],
  done: [defaultTaskLegendsLabel, { backgroundColor: STATUS_COLOR.done }],
})
