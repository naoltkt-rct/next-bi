/**
 * 文言変換
 */
// 職種
export const formatJobJA = (value: string) => {
  switch (value) {
    case 'director':
      return 'ディレクター'
    case 'designer':
      return 'デザイナー'
    case 'frontend':
      return 'フロントエンドエンジニア'
    case 'backend':
      return 'バックエンドエンジニア'
    default:
      return value
  }
}

// 優先度
export const formatPriorityJA = (value: string) => {
  switch (value) {
    case 'high':
      return '高'
    case 'middle':
      return '中'
    case 'low':
      return '低'
    default:
      return value
  }
}

// 状態
export const formatStatusJA = (value: string) => {
  switch (value) {
    case 'waiting':
      return '未対応'
    case 'processing':
      return '対応中'
    case 'completed':
      return '対応済み'
    case 'done':
      return '完了'
    default:
      return value
  }
}

// 並び替え
export const formatSortJA = (value: string) => {
  switch (value) {
    case 'priority':
      return '優先度'
    case 'status':
      return '状態'
    case 'startDate':
      return '開始日'
    case 'endDate':
      return '期限日'
    default:
      return value
  }
}
