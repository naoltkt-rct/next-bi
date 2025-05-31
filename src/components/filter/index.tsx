// functions
import type { Jobs, Users } from '@/models'
import { formatJobJA } from '@/utilities'

// styles
import { container, items, refreshIcon, wrapper } from './styles.css'

// types
type Props = {
  values: string[]
  current: Jobs | null
  setJobs: React.Dispatch<React.SetStateAction<Jobs | null>>
  setUsersData: React.Dispatch<React.SetStateAction<Users[]>>
  functions: (value: string) => void
  raws: Users[]
  isFiltering: boolean
  isSp: boolean
}

export default function Filter({ values, current, setJobs, setUsersData, functions, raws, isFiltering, isSp }: Props) {
  // 絞り込みを実行
  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setJobs(event.currentTarget.value as Jobs)
    functions(event.currentTarget.value)
  }

  // 絞り込みを解除
  const handleOnClickRefresh = () => {
    setJobs(null)
    setUsersData(raws)
  }

  return (
    <div className={wrapper}>
      <div className={container}>
        <button
          type="button"
          className={items[current === null ? 'current' : 'default']}
          onClick={handleOnClickRefresh}
          disabled={current === null || isFiltering}
        >
          すべて
        </button>
        {values.map((value: string) => (
          <button
            key={value}
            type="button"
            className={items[current === value ? 'current' : 'default']}
            onClick={handleOnClick}
            value={value}
            disabled={current === value || isFiltering}
          >
            {formatJobJA(value)}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={handleOnClickRefresh}
        className={refreshIcon}
        disabled={current === null || isFiltering}
      >
        <img
          src="/refresh.svg"
          alt="絞り込みを解除"
        />
      </button>
    </div>
  )
}
