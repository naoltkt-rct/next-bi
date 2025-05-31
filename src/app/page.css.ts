// packages
import { dvfz, dvw } from '@/styles/mixin'
import { keyframes, style, styleVariants } from '@vanilla-extract/css'

// functions
import { TASK_SORTS } from '@/constants'
import { mq } from '@/styles/mixin'
import { COLORS, EASINGS, LAYOUT } from '@/themes'

/**
 * constants
 */
export const taskCellDefaultWidth = 140

/**
 * keyframes
 */
export const userCarouselItemsKeyframes = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(50px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
})
export const userCarouselItemsChangingKeyframes = keyframes({
  '0%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
  '100%': {
    opacity: 0,
    transform: 'translateY(50px)',
  },
})

/**
 * style
 */
export const taskItems = style({
  backgroundColor: 'white',
  boxShadow: '0 0 10px 0 rgba(69, 73, 106, 0.3)',
  borderRadius: 10,
  transition: 'background 0.3s',
  selectors: {
    '&:hover': {
      color: 'white',
      backgroundColor: COLORS.primary,
    },
    '&:last-of-type': {
      marginBottom: 0,
    },
  },
  '@media': {
    ...mq('PC', {
      marginBottom: LAYOUT.PC.gutter / 2,
    }),
    ...mq('SP', {
      marginBottom: LAYOUT.SP.gutter / 2,
    }),
  },
})

export const taskLinks = style({
  '@media': {
    ...mq('PC', {
      display: 'flex',
      columnGap: LAYOUT.PC.gutter,
      paddingTop: '1em',
      paddingBottom: '1em',
    }),
    ...mq('TB', {
      columnGap: `${dvw(LAYOUT.PC.gutter)}dvw`,
    }),
    ...mq('SP', {
      display: 'block',
      padding: '1em',
    }),
  },
})

export const defaultTaskCell = style({
  textAlign: 'center',
  '@media': {
    ...mq('PC', {
      width: taskCellDefaultWidth,
      paddingLeft: LAYOUT.PC.gutter / 2,
      paddingRight: LAYOUT.PC.gutter / 2,
    }),
    ...mq('TB', {
      width: `${dvw(taskCellDefaultWidth)}dvw`,
      paddingLeft: `${dvw(LAYOUT.PC.gutter / 2)}dvw`,
      paddingRight: `${dvw(LAYOUT.PC.gutter / 2)}dvw`,
    }),
    ...mq('SP', {
      display: 'block',
      textAlign: 'left',
    }),
  },
})

export const taskCell = styleVariants({
  default: [defaultTaskCell],
  fixed: [
    defaultTaskCell,
    {
      textAlign: 'left',
      '@media': {
        ...mq('PC', {
          width: LAYOUT.PC.inner - TASK_SORTS.length * taskCellDefaultWidth,
        }),
        ...mq('TB', {
          width: `${dvw(LAYOUT.PC.inner - TASK_SORTS.length * taskCellDefaultWidth)}dvw`,
        }),
        ...mq('SP', {
          marginBottom: LAYOUT.SP.gutter / 2,
        }),
      },
    },
  ],
})

export const taskCellHeading = style({
  selectors: {
    '&::after': {
      content: '：',
    },
  },
  // display: 'block',
})

export const userCarousel = style({
  // overflow: 'visible',
  '@media': {
    ...mq('PC', {
      maxWidth: 'max-content',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingTop: LAYOUT.PC.gutter,
      paddingBottom: LAYOUT.PC.gutter,
    }),
    ...mq('SP', {
      paddingTop: LAYOUT.SP.gutter,
      paddingBottom: LAYOUT.SP.gutter,
    }),
  },
})

export const userCarouselNavigation = style({
  display: 'flex',
  justifyContent: 'space-between',
  '@media': {
    ...mq('PC', {
      paddingLeft: LAYOUT.PC.gutter / 2,
      paddingRight: LAYOUT.PC.gutter / 2,
    }),
    ...mq('TB', {
      paddingLeft: `${dvw(LAYOUT.PC.gutter / 2)}dvw`,
      paddingRight: `${dvw(LAYOUT.PC.gutter / 2)}dvw`,
    }),
    ...mq('SP', {
      paddingLeft: LAYOUT.SP.gutter / 2,
      paddingRight: LAYOUT.SP.gutter / 2,
    }),
  },
})

export const defaultUserCarouselArrow = style({
  display: 'block',
  transition: 'opacity 0.3s',
  selectors: {
    '&:disabled': {
      opacity: 0.1,
      pointerEvents: 'none',
    },
  },
})

export const userCarouselArrow = styleVariants({
  prev: [defaultUserCarouselArrow, { rotate: '180deg' }],
  next: [defaultUserCarouselArrow],
})

export const userCarouselItems = style({
  display: 'block',
  position: 'relative',
  boxShadow: '0 0 10px 0 rgba(69, 73, 106, 0.3)',
  overflow: 'hidden',
  opacity: 0,
  '@media': {
    ...mq('PC', {
      width: 255,
      height: 340,
      borderRadius: 30,
      marginLeft: LAYOUT.PC.gutter / 2,
      marginRight: LAYOUT.PC.gutter / 2,
    }),
    ...mq('TB', {
      width: `${dvw(255)}dvw`,
      height: `${dvw(340)}dvw`,
      borderRadius: `${dvw(30)}dvw`,
      marginLeft: `${dvw(LAYOUT.PC.gutter / 2)}dvw`,
      marginRight: `${dvw(LAYOUT.PC.gutter / 2)}dvw`,
    }),
    ...mq('SP', {
      width: `${dvw(128, LAYOUT.SP.inner)}dvw`,
      height: `${dvw(170, LAYOUT.SP.inner)}dvw`,
      borderRadius: 15,
      marginLeft: `${dvw(LAYOUT.SP.gutter / 2, LAYOUT.SP.inner)}dvw`,
      marginRight: `${dvw(LAYOUT.SP.gutter / 2, LAYOUT.SP.inner)}dvw`,
    }),
  },
})

export const userCarouselItemsChanging = style({
  opacity: 1,
})

// animations
export const defaultSlidesWithDelay = style({
  animation: `${userCarouselItemsKeyframes} 0.3s ${EASINGS.easeInOutSine} forwards`,
})
export const changingSlidesWithDelay = style({
  animation: `${userCarouselItemsChangingKeyframes} 0.3s ${EASINGS.easeInOutSine} forwards`,
})

// delays
const gutterSlideWithDelays = (max: number, milliseconds: number) =>
  Object.fromEntries(
    Array.from({ length: max }, (_, i) => [
      i.toString(),
      {
        animationDelay: `${milliseconds * i}s`,
      },
    ]),
  )
export const slideWithDelay = styleVariants(gutterSlideWithDelays(10, 0.1), (variant) => [defaultSlidesWithDelay, variant])
export const slideChangingWithDelay = styleVariants(gutterSlideWithDelays(10, 0.1), (variant) => [changingSlidesWithDelay, variant])

export const userCarouselLinks = style({
  display: 'block',
})

export const userCarouselImage = style({
  display: 'block',
  position: 'absolute',
  top: 0,
  left: '50%',
  width: 'auto',
  height: '100%',
  transition: 'transform 0.3s',
  transform: 'translateX(-50%)',
  selectors: {
    [`${userCarouselLinks}:hover &`]: {
      transform: 'translateX(-50%) scale(1.1)',
    },
  },
})

export const userCarouselInformation = style({
  display: 'block',
  position: 'absolute',
  bottom: 0,
  left: 0,
  color: 'white',
  textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  padding: '1em',
  '@media': {
    ...mq('SP', {
      fontSize: dvfz(12, LAYOUT.SP.inner),
    }),
  },
})

export const userVacancy = style({
  textAlign: 'center',
  '@media': {
    ...mq('PC', {
      paddingTop: LAYOUT.PC.gutter * 2,
      paddingBottom: LAYOUT.PC.gutter * 2,
    }),
    ...mq('SP', {
      paddingTop: LAYOUT.SP.gutter * 2,
      paddingBottom: LAYOUT.SP.gutter * 2,
    }),
  },
})
