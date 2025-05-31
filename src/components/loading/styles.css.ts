import { convertHexToRgb } from '@/styles/mixin'
import { COLORS, LAYOUT } from '@/themes'
import { keyframes, style } from '@vanilla-extract/css'

// keyframes
export const spinnerKeyframes = keyframes({
  '0%': {
    transform: 'rotate(0)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
})
export const fillsKeyframes = keyframes({
  '0%': {
    transform: 'rotate(0)',
  },
  '50%': {
    transform: 'rotate(-140deg)',
  },
  '100%': {
    transform: 'rotate(0)',
  },
})

// layout
export const container = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  zIndex: 9,
  width: '100%',
  height: '100%',
  color: '#fff',
  backgroundColor: `rgba(${convertHexToRgb('#fff')}, 0.9)`,
})

export const spinner = style({
  display: 'inline-block',
  position: 'relative',
  top: -50,
  left: 0,
  width: 50,
  height: 50,
  margin: 50,
  opacity: 0.75,
  animation: `${spinnerKeyframes} 0.5s linear infinite`,
})

//
export const rails = style({
  display: 'block',
  position: 'relative',
  top: 0,
  left: 0,
  width: 25,
  height: 50,
  background: 'none',
  overflow: 'hidden',
})

export const fills = style({
  display: 'block',
  width: 50,
  height: 50,
  background: 'none',
  border: `10px solid rgba(${convertHexToRgb(COLORS.primary)}, 0.9)`,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  borderRadius: '50%',
  boxSizing: 'border-box',
  animation: `${fillsKeyframes} 1s cubic-bezier(0.2, 0, 0.3, 1) infinite`,
})
