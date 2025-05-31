import { BREAKPOINTS } from '@/themes'

//
export const mq = (bp: string, priorities: { [key: string]: string | number }) => {
  return {
    [BREAKPOINTS[bp as keyof typeof BREAKPOINTS]]: priorities,
  }
}
