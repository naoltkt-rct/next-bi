'use client'

/**
 * imports
 */
// packages
import { format } from 'date-fns'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

// swiper
import type SwiperCore from 'swiper/core'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import 'swiper/css/navigation'

// functions
import Filter from '@/components/filter'
import Loading from '@/components/loading'
import OverCapacity from '@/components/overCapacity'
import SortBar from '@/components/sortBar'
import Tab from '@/components/tab'
import { TABS, TASK_PRIORITIES, TASK_SORTS, TASK_STATUS, USER_JOBS, USER_OCCUPANCY_RATE_THRESHOLD } from '@/constants'
import { fetcher } from '@/hooks'
import { useAppMedia } from '@/hooks/useAppMedia'
import type { Jobs, Order, Sort, Tabs, Task, Users } from '@/models'
import { BREAKPOINTS } from '@/themes'
import { formatJobJA, formatPriorityJA, formatStatusJA } from '@/utilities'

// styles
import { defaultContainer } from '@/styles/container.css'
import { pageTitle } from '@/styles/title.css'
import {
  slideChangingWithDelay,
  slideWithDelay,
  taskCell,
  taskCellHeading,
  taskItems,
  taskLinks,
  userCarousel,
  userCarouselArrow,
  userCarouselImage,
  userCarouselInformation,
  userCarouselItems,
  userCarouselItemsChanging,
  userCarouselLinks,
  userCarouselNavigation,
  userVacancy,
} from './page.css'

export default function Home() {
  /**
   * useState
   */
  // 生データ
  const [tasks, setTask] = useState<Task[]>([])
  const [users, setUsers] = useState<Users[]>([])
  // 表示用データ
  const [tasksData, setTasksData] = useState<Task[]>([])
  const [usersData, setUsersData] = useState<Users[]>([])
  // 表示条件
  const [displays, setDisplays] = useState<'TASKS' | 'USERS'>('TASKS')
  const [sorts, setSorts] = useState<Sort>('startDate')
  const [orders, setOrders] = useState<Order>('DESC')
  const [jobs, setJobs] = useState<Jobs | null>(null)
  // ローディング
  const [isLoading, setIsLoading] = useState<boolean>(true)
  // 絞り込み
  const [isFiltering, setIsFiltering] = useState<boolean>(false)

  /**
   * useRef
   */
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const slides = useRef<any>(null)

  /**
   * custom hooks
   */
  const isSp = useAppMedia(BREAKPOINTS.SP)

  /**
   * useEffect
   */
  // 初期
  useEffect(() => {
    // 案件一覧を取得
    getTask()
    // ユーザー一覧を取得
    getUsers()
  }, [])

  // 表示用データを設定
  useEffect(() => {
    // 表示用の案件一覧を設定（デフォルト： 開始日の降順）
    if (displays === 'TASKS') {
      setTasksData(tasks.sort((a: Task, b: Task) => (a.startDate > b.startDate ? -1 : 1)))
      // USERS: データ絞り込みを初期化
      setJobs(null)
    }
    // 表示用のユーザー一覧を設定
    if (displays === 'USERS') {
      // データ絞り込み後
      setUsersData(users)
      // TASKS: データ並び替えを初期化
      setSorts('startDate')
      setOrders('DESC')
    }
  }, [users, tasks, displays])

  /**
   * データ取得
   */
  // 案件一覧を取得
  const getTask = async () => setTask(await fetcher(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/task`, undefined, setIsLoading))
  // ユーザー一覧を取得
  const getUsers = async (job?: string) => setUsers(await fetcher(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user`, undefined, setIsLoading))

  /**
   * データ並び替え
   */
  // 種別の切り替え
  const sortTasks = (value: string, order: Order) => {
    switch (value) {
      // 優先度順
      case 'priority':
        setTasksData(tasks.sort((a: Task, b: Task) => handleOrderArrays(TASK_PRIORITIES, order, value, a, b)))
        break
      // 状態順
      case 'status':
        setTasksData(tasks.sort((a: Task, b: Task) => handleOrderArrays(TASK_STATUS, order, value, a, b)))
        break
      // 開始日 / 期限日順
      case 'startDate':
      case 'endDate':
        setTasksData(tasks.sort((a: Task, b: Task) => (order === 'DESC' ? (a[value] > b[value] ? 1 : -1) : a[value] < b[value] ? 1 : -1)))
        break
      default:
        break
    }
    // state を更新
    setOrders(order)
    setSorts(value as Sort)
  }

  // 降順・昇順の切り替え
  const handleOrderArrays = (array: string[], order: Order, value: string, a: Task, b: Task) =>
    order === 'DESC'
      ? array.indexOf(a[value as keyof Task]) - array.indexOf(b[value as keyof Task])
      : array.indexOf(b[value as keyof Task]) - array.indexOf(a[value as keyof Task])

  /**
   * データ絞り込み
   */
  const filterUsers = (job: string) => {
    // データ絞り込み前
    setIsFiltering(true)
    // データ絞り込みを実行
    const el = (slides.current?.swiper as SwiperCore)?.slides
    // 対象がある場合、onanimationend を検知後、データを絞り込む
    if (users.filter((user: Users) => user.job === job).length > 0 && el) {
      el[el?.length - 1].onanimationend = () => setUsersData(users.filter((user: Users) => user.job === job))
    }
    // 対象がない場合
    else {
      setUsersData(users.filter((user: Users) => user.job === job))
      setIsFiltering(false)
    }
  }

  /**
   * 要素を出力
   */
  // TASKS
  // items
  const generateTaskItems = (task: Task) => (
    <li
      key={task.id}
      className={taskItems}
    >
      <Link
        href={`/tasks/${task.id}`}
        className={taskLinks}
      >
        <span className={taskCell['fixed' as keyof typeof taskCell]}>{task.name}</span>
        <span className={taskCell['default' as keyof typeof taskCell]}>
          {isSp && <span className={taskCellHeading}>優先度</span>}
          {formatPriorityJA(task.priority)}
        </span>
        <span className={taskCell['default' as keyof typeof taskCell]}>
          {isSp && <span className={taskCellHeading}>状態</span>}
          {formatStatusJA(task.status)}
        </span>
        <span className={taskCell['default' as keyof typeof taskCell]}>
          {isSp && <span className={taskCellHeading}>開始日</span>}
          {format(new Date(task.startDate), 'yyyy/MM/dd')}
        </span>
        <span className={taskCell['default' as keyof typeof taskCell]}>
          {isSp && <span className={taskCellHeading}>期限日</span>}
          {format(new Date(task.endDate), 'yyyy/MM/dd')}
        </span>
      </Link>
    </li>
  )

  // USERS
  // items
  const generateUserCarouselItems = (user: Users, i: number) => (
    <SwiperSlide
      key={user.id}
      className={`${userCarouselItems} ${isFiltering ? `${userCarouselItemsChanging} ${slideChangingWithDelay[i]}` : slideWithDelay[i]}`}
    >
      <Link
        href={`/users/${user.id}`}
        className={userCarouselLinks}
      >
        <img
          className={userCarouselImage}
          src={user.avatar}
          alt={user.username}
          loading="lazy"
        />
        <span className="swiper-lazy-preloader" />

        <div className={userCarouselInformation}>
          <span>{user.username}</span>
          <br />
          <span>{formatJobJA(user.job)}</span>
        </div>
      </Link>
    </SwiperSlide>
  )

  // navigation
  const generateCarouselNavigation = () => (
    <div className={userCarouselNavigation}>
      {generateUserCarouselArrow('prev')}
      {generateUserCarouselArrow('next')}
    </div>
  )

  // arrow
  const generateUserCarouselArrow = (direction: 'prev' | 'next') => (
    <button
      type="button"
      id={`userCarouselArrow${direction.charAt(0).toUpperCase() + direction.slice(1).toLowerCase()}`}
      className={userCarouselArrow[direction as keyof typeof userCarouselArrow]}
    >
      <img
        src="/arrow.svg"
        alt=""
      />
    </button>
  )
  return (
    <>
      <Loading isLoading={isLoading} />
      {users.filter((user: Users) => (user.totalOccupancyRate as number) > USER_OCCUPANCY_RATE_THRESHOLD).length > 0 && (
        <OverCapacity data={users} />
      )}
      {/* タブ切り替え */}
      <Tab
        values={TABS as Tabs[]}
        current={displays}
        setState={setDisplays}
      />
      <section className={displays === 'TASKS' ? defaultContainer : ''}>
        <h1 className={pageTitle}>{displays}</h1>
        {/* TASKS */}
        {displays === 'TASKS' && (
          <>
            <SortBar
              values={TASK_SORTS}
              sorts={sorts}
              orders={orders}
              functions={sortTasks}
              isSp={isSp}
            />
            {tasksData &&
              (tasksData.length > 0 ? <ul>{tasksData.map((task: Task) => generateTaskItems(task))}</ul> : <p>案件はありません</p>)}
          </>
        )}
        {/* USERS */}
        {displays === 'USERS' && (
          <>
            {usersData && (
              <>
                {/* 絞り込み */}
                <Filter
                  values={USER_JOBS}
                  current={jobs}
                  setJobs={setJobs}
                  setUsersData={setUsersData}
                  functions={filterUsers}
                  raws={users}
                  isFiltering={isFiltering}
                  isSp={isSp}
                />
                {usersData.length > 0 ? (
                  <>
                    <Swiper
                      ref={slides}
                      className={userCarousel}
                      // init={false}
                      modules={[Navigation]}
                      slidesPerView="auto"
                      navigation={{
                        prevEl: '#userCarouselArrowPrev',
                        nextEl: '#userCarouselArrowNext',
                      }}
                      onSlidesUpdated={() => {
                        if (isFiltering) setIsFiltering(false)
                      }}
                    >
                      {usersData.map((user: Users, i: number) => generateUserCarouselItems(user, i))}
                    </Swiper>
                    {generateCarouselNavigation()}
                  </>
                ) : (
                  jobs && <p className={`${userVacancy} ${defaultContainer}`}>{formatJobJA(jobs as Jobs)}はいません</p>
                )}
              </>
            )}
          </>
        )}
      </section>
    </>
  )
}
