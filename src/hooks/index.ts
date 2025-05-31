/**
 * データ取得
 */

export const fetcher = async (uri: string, options?: RequestInit, setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>) => {
  try {
    // ローディングを表示
    if (setIsLoading) setIsLoading(true)
    // データ取得
    const response = await fetch(uri, options)
    if (!response.ok) throw new Error('Failed to fetch data')
    return await response.json()
  } catch (error) {
    throw new Error('Failed to fetch data')
  } finally {
    // ローディングを非表示
    if (setIsLoading) setIsLoading(false)
  }
}
