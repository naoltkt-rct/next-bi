import { LAYOUT } from '@/themes'

//
export const pw = (width: number, innerWidth: number = LAYOUT.PC.inner) => (width / innerWidth) * 100

//
export const dvw = (width: number, viewport: number = LAYOUT.PC.inner) => (100 / viewport) * width
