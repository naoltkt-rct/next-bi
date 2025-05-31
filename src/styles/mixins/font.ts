import { dvw } from '@/styles/mixins/width'
import { LAYOUT } from '@/themes'

//
export const fz = (sizes: number): string => `${sizes / 16}rem`

//
export const dvfz = (sizes: number, viewport: number = LAYOUT.PC.inner): string => `${dvw(sizes, viewport)}dvw`
