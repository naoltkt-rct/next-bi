'use client'

/**
 * imports
 */
// packages
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// chart.js
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Tooltip } from 'chart.js'
import type { ChartOptions } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'
import { Bar } from 'react-chartjs-2'
// Chart.js のコンポーネントとプラグインを登録
ChartJS.register(LinearScale, BarElement, CategoryScale, Tooltip, annotationPlugin)

// functions
import Loading from '@/components/loading'
import { createCustomTooltip, positionTooltip } from '@/components/tooltip'
import { fetcher } from '@/hooks'
import type { TasksAssignmentOccupancyRate, TasksAssignmentUser, UsersDetail } from '@/models'
import { COLORS } from '@/themes'
import { formatJobJA, formatPriorityJA, formatStatusJA } from '@/utilities'

// styles
import { button } from '@/styles/button.css'
import { defaultContainer } from '@/styles/container.css'
import { headings } from '@/styles/heading.css'
import { pageTitle } from '@/styles/title.css'
import {
  assignmentTasksCaption,
  assignmentTasksTotalOccupancyRateOver,
  backToTop,
  informationUser,
  informationUserContent,
  informationUserImage,
  informationUserText,
  wrapper,
} from './page.css'

export default function TasksDetail({ params }: { params: { id: string } }) {
  /**
   * useState
   */
  const [users, setUsers] = useState<UsersDetail>()
  const [assignmentTasks, setAssignmentTasks] = useState<TasksAssignmentUser>()
  // ローディング
  const [isLoading, setIsLoading] = useState<boolean>(true)

  /**
   * useEffect
   */
  // 初期
  useEffect(() => {
    getUser()
  }, [])
  // ユーザーに割り当てられた案件を取得
  useEffect(() => {
    if (users) {
      const params = users.taskIds.map((task) => task)
      params.length > 0 &&
        postAssignmentTask({
          userId: users.id,
          taskIds: params,
        })
    }
  }, [users])

  /**
   * データ取得
   */
  // ユーザー詳細を取得
  const getUser = async () => setUsers(await fetcher(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/${params.id}`))
  // ユーザーに割り当てられた案件を取得
  const postAssignmentTask = async (params: { userId: string; taskIds: string[] }) =>
    setAssignmentTasks(
      await fetcher(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/task`,
        {
          method: 'POST',
          body: JSON.stringify(params),
        },
        setIsLoading,
      ),
    )

  /**
   * グラフ描画
   */
  // 表示用データの整形
  const chartData = (data: TasksAssignmentOccupancyRate[]) => {
    const dataColors = ['#b3eddb', '#d1f4ed', '#f6e6cc', '#f1d2cd', '#a2bde3']

    return {
      labels: ['Graph'],
      datasets: data.map((item, index) => {
        return {
          label: item.id,
          data: [item.occupancyRate],
          backgroundColor: dataColors[index],
        }
      }),
    }
  }
  // オプションの設定
  const chartOptions = (data: TasksAssignmentUser): ChartOptions<'bar'> => {
    return {
      indexAxis: 'y',
      scales: {
        x: {
          stacked: true,
          min: 0,
          max: 120,
          beginAtZero: true,
        },
        y: {
          stacked: true,
          display: false,
        },
      },
      plugins: {
        tooltip: {
          enabled: false,
          external: (context) => {
            const tooltipEl = createCustomTooltip()
            const tooltipModel = context.tooltip
            //
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = '0'
              return
            }
            //
            const table = tooltipEl.querySelector('table')
            if (table)
              table.innerHTML = chartTooltip(
                context.tooltip.dataPoints[0].dataset.label as unknown as string,
                assignmentTasks?.tasks as unknown as TasksAssignmentOccupancyRate[],
              )
            positionTooltip(context.tooltip)
          },
        },
        annotation: {
          annotations: [
            {
              type: 'line',
              xMin: 100,
              xMax: 100,
              borderWidth: 2,
              borderColor: assignmentTasks && assignmentTasks.totalOccupancyRate > 100 ? COLORS.error : COLORS.primary,
              z: 8,
              label: {
                display: true,
                content: '100%',
                position: 'end',
                backgroundColor: assignmentTasks && assignmentTasks.totalOccupancyRate > 100 ? COLORS.error : COLORS.primary,
              },
            },
          ],
        },
      },
      onHover: (event, chartElement) => {
        if (event.native) (event.native.target as HTMLElement).style.cursor = chartElement[0] ? 'pointer' : 'default'
      },
    }
  }
  // tooltip の内容
  const chartTooltip = (id: string, tasks: TasksAssignmentOccupancyRate[]) => {
    const pic = tasks.filter((task: TasksAssignmentOccupancyRate) => task.id === id)[0]
    const tooltipHeading = (content: string) => `<thead><tr><th>${content}</th></tr><th>`
    const tooltipContent = (content: string) => `<tbody><tr><td>${content}</th></tr><th>`
    // html形式の文字列を生成
    return `
      ${tooltipHeading(`
        <div style="margin-bottom: 0.5em">
          <span>${pic.name}</span>
        </div>
      `)}
      ${tooltipContent(`
        <div style="margin-bottom: 0.5em">
          <span>優先度：${formatPriorityJA(pic.priority)}</span>
        </div>
        <div style="margin-bottom: 0.5em">
          <span>状態：${formatStatusJA(pic.status)}</span>
        </div>
        <div>
          <span>開始日：${format(parseISO(pic.startDate), 'yyyy/MM/dd')}</span>
          <span>期限日：${format(parseISO(pic.endDate), 'yyyy/MM/dd')}</span>
        </div>
      `)}
    `
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <section className={`${wrapper} ${defaultContainer}`}>
        <h1 className={pageTitle}>USERS</h1>
        {users ? (
          <>
            <h2 className={headings['h2' as keyof typeof headings]}>{users.username}</h2>
            <div className={informationUser}>
              <figure className={informationUserImage}>
                <img
                  src={users.avatar}
                  alt={users.username}
                  width={320}
                />
              </figure>
              <div className={informationUserContent}>
                <p className={informationUserText}>{formatJobJA(users.job)}</p>
                <p className={informationUserText}>{users.description}</p>
              </div>
            </div>

            {/* ユーザーに割り当てられた案件一覧 */}
            <h3 className={headings['h3' as keyof typeof headings]}>割り当てられた案件一覧</h3>
            {assignmentTasks && assignmentTasks.tasks?.length > 0 ? (
              <>
                <p className={assignmentTasksCaption}>
                  割り当てられた案件の稼働率の合計：
                  {assignmentTasks.totalOccupancyRate > 100 ? (
                    <span className={assignmentTasksTotalOccupancyRateOver}>{assignmentTasks.totalOccupancyRate}%</span>
                  ) : (
                    <>{assignmentTasks.totalOccupancyRate}%</>
                  )}
                </p>
                <Bar
                  data={chartData(assignmentTasks.tasks)}
                  options={chartOptions(assignmentTasks)}
                />
              </>
            ) : (
              <p className={assignmentTasksCaption}>まだ割り当てられた案件はありません</p>
            )}
          </>
        ) : (
          <p>データを取得できませんでした</p>
        )}
        <div className={backToTop}>
          <Link
            href="/"
            className={button['default' as keyof typeof button]}
          >
            トップに戻る
          </Link>
        </div>
      </section>
    </>
  )
}
