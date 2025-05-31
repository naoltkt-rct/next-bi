/**
 * imports
 */
// packages
import Link from 'next/link'

// functions
import { USER_OCCUPANCY_RATE_THRESHOLD } from '@/constants'
import type { Users } from '@/models'

// styles
import { container, items } from './styles.css'

// types
type Props = {
  data: Users[]
}

export default function OverCapacity({ data }: Props) {
  return (
    <div className={container}>
      <span>業務過多のユーザー</span>
      {data
        .filter((user: Users) => (user.totalOccupancyRate as number) > USER_OCCUPANCY_RATE_THRESHOLD)
        .map((user: Users) => (
          <Link
            href={`/users/${user.id}`}
            key={user.id}
            className={items}
          >
            <figure>
              <img
                src={user.avatar}
                alt={user.username}
                height={44}
              />
            </figure>
          </Link>
        ))}
    </div>
  )
}
