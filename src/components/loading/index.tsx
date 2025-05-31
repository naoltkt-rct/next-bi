//
import { container, fills, rails, spinner } from './styles.css'

//
type Props = {
  isLoading: boolean
}

export default function Loading({ isLoading }: Props) {
  return (
    isLoading && (
      <div className={container}>
        <span className={spinner}>
          <div className={rails}>
            <div className={fills} />
          </div>
        </span>
      </div>
    )
  )
}
