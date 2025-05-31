import { dvfz, fz, mq } from '@/styles/mixin'
import { COLORS, LAYOUT } from '@/themes'
import { style, styleVariants } from '@vanilla-extract/css'

export const defaultHeadings = style({
  fontWeight: 600,
})

export const headings = styleVariants({
  h2: [
    defaultHeadings,
    {
      color: COLORS.primary,
      '@media': {
        ...mq('PC', {
          fontSize: fz(32),
          marginBottom: LAYOUT.PC.gutter,
        }),
        ...mq('TB', {
          fontSize: dvfz(32),
          marginBottom: dvfz(LAYOUT.PC.gutter),
        }),
        ...mq('SP', {
          fontSize: fz(32),
          marginBottom: LAYOUT.SP.gutter,
        }),
      },
    },
  ],
  h3: [
    defaultHeadings,
    {
      position: 'relative',
      color: COLORS.primary,
      paddingLeft: '1.5em',
      selectors: {
        '&::before': {
          content: '',
          display: 'block',
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '1em',
          height: 2,
          backgroundColor: COLORS.primary,
          transform: 'translateY(-50%)',
        },
      },
      '@media': {
        ...mq('PC', {
          fontSize: fz(20),
          marginBottom: LAYOUT.PC.gutter / 2,
        }),
        ...mq('TB', {
          fontSize: dvfz(20),
          marginBottom: dvfz(LAYOUT.PC.gutter / 2),
        }),
        ...mq('SP', {
          fontSize: fz(20),
          marginBottom: LAYOUT.SP.gutter / 2,
        }),
      },
    },
  ],
})
