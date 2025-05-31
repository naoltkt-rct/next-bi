'use client'

/**
 * imports
 */
// packages
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// chart.js
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, TimeScale, Tooltip } from 'chart.js'
import type { ChartOptions } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'
import { Bar } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'
// Chart.js のコンポーネントとプラグインを登録
ChartJS.register(LinearScale, TimeScale, BarElement, CategoryScale, Tooltip, annotationPlugin)

// functions
import Loading from '@/components/loading'
import { createCustomTooltip, positionTooltip } from '@/components/tooltip'
import { fetcher } from '@/hooks'
import type { Tasks, TasksAssignment, User } from '@/models/index'
import { STATUS_COLOR } from '@/themes'
import { formatJobJA, formatPriorityJA, formatStatusJA } from '@/utilities'

// styles
import { button } from '@/styles/button.css'
import { defaultContainer } from '@/styles/container.css'
import { headings } from '@/styles/heading.css'
import { pageTitle } from '@/styles/title.css'
import { backToTop, informationBlocks, informationDescription, taskLegends, taskLegendsItem, taskLegendsLabel, wrapper } from './page.css'

// types
type TasksAssignmentTooltip = {
  label: string
  x: [string, string]
  y: string
}

export default function TasksDetail({ params }: { params: { id: string } }) {
  /**
   * useState
   */
  const [tasks, setTask] = useState<Tasks>()
  const [assignmentUsers, setAssignmentUsers] = useState<User[]>([])
  // ローディング
  const [isLoading, setIsLoading] = useState<boolean>(true)

  /**
   * useEffect
   */
  // 初期
  useEffect(() => {
    // 案件詳細を取得
    getTask()
  }, [])
  // 案件に割り当てられたユーザーを取得
  useEffect(() => {
    if (tasks) {
      const params = tasks.assignment.map((task) => task.assignmentId)
      params.length > 0 && postAssignmentUser({ assignmentIds: params })
    }
  }, [tasks])

  /**
   * データ取得
   */
  // 案件詳細を取得
  const getTask = async () => setTask(await fetcher(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/task/${params.id}`, undefined, setIsLoading))
  // 案件に割り当てられたユーザーを取得
  const postAssignmentUser = async (params: { assignmentIds: string[] }) =>
    setAssignmentUsers(
      await fetcher(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user`, {
        method: 'POST',
        body: JSON.stringify(params),
      }),
    )

  /**
   * グラフ描画
   */
  // 表示用データの整形
  const chartData = (data: TasksAssignment[]) => {
    return {
      labels: data.map((item) => item.assignmentName),
      datasets: [
        {
          data: data.map((item) => {
            return {
              label: item.assignmentId,
              x: [item.startDate, item.endDate],
              y: item.assignmentName,
            }
          }),
          backgroundColor: data.map((item) => STATUS_COLOR[item.status as keyof typeof STATUS_COLOR]),
        },
      ],
    }
  }
  // オプションの設定
  const chartOptions = (data: Tasks): ChartOptions<'bar'> => {
    // 当日を取得
    const today = new Date()
    return {
      indexAxis: 'y',
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
          },
          min: data.startDate,
          max: data.endDate,
          position: 'top',
          ticks: {
            callback: (tickValue) => format(tickValue, 'MM/dd'),
          },
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
                context.tooltip.dataPoints[0].dataset.data[context.tooltip.dataPoints[0].dataIndex] as unknown as TasksAssignmentTooltip,
                data.assignment,
              )
            positionTooltip(context.tooltip)
          },
        },
        annotation: {
          annotations: [
            {
              type: 'line',
              xMin: today.getTime(),
              xMax: today.getTime(),
              borderWidth: 2,
              label: {
                display: true,
                content: 'Today',
                position: 'end',
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
  const chartTooltip = (data: TasksAssignmentTooltip, assignment: TasksAssignment[]) => {
    const pic = assignmentUsers.filter((user: User) => user.id === data.label)[0]
    const assignments = assignment.filter((item: TasksAssignment) => item.assignmentId === data.label)[0]
    const tooltipHeading = (content: string) => `<thead><tr><th>${content}</th></tr><th>`
    const tooltipContent = (content: string) => `<tbody><tr><td>${content}</th></tr><th>`

    // html形式の文字列を生成
    return `
      ${tooltipHeading(`
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 0.5em">
          <img src="${pic?.avatar}" alt="${pic?.username}" width="24" height="24" />
          <span>${pic?.username}</span>
        </div>
      `)}
      ${tooltipContent(`
        <div style="margin-bottom: 0.5em">
          <span>${formatJobJA(assignments.jobType)}</span>
        </div>
        <div style="margin-bottom: 0.5em">
          <span>状態：${formatStatusJA(assignments.status)}</span>
        </div>
        <div>
          <span>開始日：${format(parseISO(data.x[0]), 'yyyy/MM/dd')}</span>
          <span>期限日：${format(parseISO(data.x[1]), 'yyyy/MM/dd')}</span>
        </div>
      `)}
    `
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <section className={`${wrapper} ${defaultContainer}`}>
        <h1 className={pageTitle}>TASKS</h1>
        {tasks && (
          <>
            <h2 className={headings['h2' as keyof typeof headings]}>{tasks.name}</h2>
            <div className={informationBlocks}>
              <span>優先度：{formatPriorityJA(tasks.priority)}</span>
              <span>状態：{formatStatusJA(tasks.status)}</span>
            </div>
            <div className={informationBlocks}>
              <span>開始日：{format(new Date(tasks.startDate), 'yyyy/MM/dd')}</span>
              <span>期限日：{format(new Date(tasks.endDate), 'yyyy/MM/dd')}</span>
            </div>
            <p className={informationDescription}>{tasks.description}</p>
            <h3 className={headings['h3' as keyof typeof headings]}>子課題一覧</h3>
            {tasks.assignment.length > 0 ? (
              <>
                <Bar
                  data={chartData(tasks.assignment)}
                  options={chartOptions(tasks)}
                />
                <ul className={taskLegends}>
                  {Object.keys(STATUS_COLOR).map((key) => (
                    <li
                      key={key}
                      className={taskLegendsItem}
                    >
                      <span className={taskLegendsLabel[key as keyof typeof STATUS_COLOR]} />
                      {formatStatusJA(key)}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>子課題はありません</p>
            )}
          </>
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
