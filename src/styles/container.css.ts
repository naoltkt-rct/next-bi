import { dvw, mq } from '@/styles/mixin'
import { LAYOUT } from '@/themes'
import { style } from '@vanilla-extract/css'

export const defaultContainer = style({
  '@media': {
    ...mq('PC', {
      maxWidth: LAYOUT.PC.container,
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: (LAYOUT.PC.container - LAYOUT.PC.inner) / 2,
      paddingRight: (LAYOUT.PC.container - LAYOUT.PC.inner) / 2,
    }),
    ...mq('TB', {
      paddingLeft: `${dvw((LAYOUT.PC.container - LAYOUT.PC.inner) / 2)}dvw`,
      paddingRight: `${dvw((LAYOUT.PC.container - LAYOUT.PC.inner) / 2)}dvw`,
    }),
    ...mq('SP', {
      paddingLeft: (LAYOUT.SP.container - LAYOUT.SP.inner) / 2,
      paddingRight: (LAYOUT.SP.container - LAYOUT.SP.inner) / 2,
    }),
  },
})
