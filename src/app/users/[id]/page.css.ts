import { mq } from '@/styles/mixin'
import { COLORS, LAYOUT } from '@/themes'
import { style } from '@vanilla-extract/css'

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

export const informationUser = style({
  '@media': {
    ...mq('PC', {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: LAYOUT.PC.gutter,
    }),
    ...mq('SP', {
      display: 'block',
      marginBottom: LAYOUT.SP.gutter,
    }),
  },
})

export const informationUserImage = style({
  '@media': {
    ...mq('PC', {
      flexShrink: 0,
    }),
  },
})

export const informationUserContent = style({
  '@media': {
    ...mq('PC', {
      paddingLeft: LAYOUT.PC.gutter,
    }),
    ...mq('SP', {
      paddingTop: LAYOUT.SP.gutter,
    }),
  },
})

export const informationUserText = style({
  '@media': {
    ...mq('PC', {
      marginBottom: '1em',
    }),
    ...mq('SP', {
      marginBottom: '1em',
    }),
  },
})

export const assignmentTasksCaption = style({
  '@media': {
    ...mq('PC', {
      marginBottom: LAYOUT.PC.gutter / 2,
    }),
    ...mq('SP', {
      marginBottom: LAYOUT.SP.gutter / 2,
    }),
  },
})

export const assignmentTasksTotalOccupancyRateOver = style({
  fontWeight: 600,
  color: COLORS.error,
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
