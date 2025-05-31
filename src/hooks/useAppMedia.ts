// @see https://zenn.dev/nabeliwo/articles/89099b39223eca

/**
 * imports
 */
// packages
import { useEffect, useState } from 'react'

/**
 *
 */
export const useAppMedia = (query: string) => {
  const [match, setMatch] = useState<boolean>(false)

  useEffect(() => {
    const mql = matchMedia(query)

    if (mql.media === 'not all' || mql.media === 'invalid') console.error('useAppMedia Error: Invalid media query')

    // 読み込み時に実行
    setMatch(mql.matches)
    // 変更時に実行
    mql.onchange = (e) => setMatch(e.matches)

    return () => {
      mql.onchange = null
    }
  }, [query])

  return match
}
