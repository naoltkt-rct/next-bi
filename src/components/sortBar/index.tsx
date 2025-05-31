//
import { assignInlineVars } from '@vanilla-extract/dynamic'

// functions
import type { Order, Sort } from '@/models'
import { formatSortJA } from '@/utilities'

// styles
import { dvw } from '@/styles/mixin'
import { LAYOUT } from '@/themes'
import { arrows, items, itemsDefaultWidth, itemsFixedWidthPC, itemsFixedWidthTB, wrapper } from './styles.css'

type Props = {
  values: string[]
  sorts: Sort
  orders: Order
  functions: (value: string, order: Order) => void
  isSp: boolean
}

export default function SortBar({ values, sorts, orders, functions, isSp }: Props) {
  return (
    <div className={wrapper}>
      {isSp ? (
        <span className={items['default' as keyof typeof items]}>並び替え</span>
      ) : (
        <span
          className={items['fixed' as keyof typeof items]}
          style={assignInlineVars({
            [itemsFixedWidthPC]: `${LAYOUT.PC.inner - values.length * itemsDefaultWidth}px`,
            [itemsFixedWidthTB]: `${dvw(LAYOUT.PC.inner - values.length * itemsDefaultWidth)}dvw`,
          })}
        >
          案件名
        </span>
      )}
      {/* 並び替え */}
      {values.map((value) => (
        <button
          key={value}
          type="button"
          className={`${items['default' as keyof typeof items]} ${sorts === value && items['current' as keyof typeof items]}`}
          onClick={() => functions(value, sorts !== value ? 'DESC' : orders === 'DESC' ? 'ASC' : 'DESC')}
          value={value}
        >
          {formatSortJA(value)}
          {sorts === value && <span className={arrows}>{orders === 'DESC' ? '▼' : '▲'}</span>}
        </button>
      ))}
    </div>
  )
}
