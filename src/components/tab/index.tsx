// functions
import type { Tabs } from '@/models'

// styles
import { button } from '@/styles/button.css'
import { defaultContainer } from '@/styles/container.css'
import { items, wrapper } from './styles.css'

// types
type Props = {
  values: Tabs[]
  current: Tabs
  setState: React.Dispatch<React.SetStateAction<Tabs>>
}

export default function Tab({ values, current, setState }: Props) {
  return (
    <div className={defaultContainer}>
      <ul className={wrapper}>
        {values.map((value) => (
          <li
            key={value}
            className={items}
          >
            <button
              key={value}
              type="button"
              className={button[current === value ? 'current' : 'default']}
              onClick={() => setState(value)}
            >
              {value} を表示
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
