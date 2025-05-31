/**
 * imports
 */
import { TASK_PRIORITIES, TASK_STATUS, USER_JOBS } from '@/constants'
import { API_FETCHER_DELAY, divideTotalInt, getRandomInt, getRandomValue } from '@/mocks/utilities'
import { faker } from '@faker-js/faker/locale/ja'
import { addDays, differenceInDays } from 'date-fns'
import { http, HttpResponse, delay } from 'msw'

const gets = http.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/task`, async () => {
  const result = []
  for (let i = 0; i < 10; i++) {
    result.push({
      id: faker.string.uuid(),
      name: `#{案件名_${faker.string.alphanumeric(8)}}`,
      priority: getRandomValue(TASK_PRIORITIES),
      status: getRandomValue(TASK_STATUS),
      startDate: faker.date.past().toISOString(),
      endDate: faker.date.future().toISOString(),
    })
  }
  // 返却を遅延させる
  await delay(API_FETCHER_DELAY)
  // 返却
  return HttpResponse.json(result)
})

const get = http.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/task/:id`, async ({ params }) => {
  // 開始日
  const sd: Date = faker.date.past()
  // 期限日
  const ed: Date = faker.date.future()
  //  開始日と終了日の間の日数
  const days: number = differenceInDays(ed, sd)
  // 案件名
  const fixedTaskNames = `#{案件名_${faker.string.alphanumeric(8)}}`
  // 説明文
  const generateTaskDescriptions = (names: string, repeats: number) => {
    let result = ''
    for (let i = 0; i < repeats; i++) {
      result += `この文章は${names}のダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。`
    }
    return result
  }
  // 返却を遅延させる
  await delay(API_FETCHER_DELAY)
  // 返却
  return HttpResponse.json({
    id: params.id,
    name: fixedTaskNames,
    priority: getRandomValue(TASK_PRIORITIES),
    status: getRandomValue(TASK_STATUS),
    startDate: sd.toISOString(),
    endDate: ed.toISOString(),
    description: generateTaskDescriptions(fixedTaskNames, getRandomInt(1, 8)),
    assignment: getAssignmentArray(sd, days),
  })
})

const getAssignmentArray = (sd: Date, days: number) => {
  const result = []
  // 0 から 5 件までをランダムに生成
  const max = getRandomInt(0, 5)
  for (let i = 0; i < max; i++) {
    const offset = getRandomInt(0, days - 1)
    const start = addDays(sd, offset)
    const end = addDays(start, getRandomInt(1, days - offset))
    result.push({
      id: faker.string.uuid(),
      assignmentName: `#{子課題_${faker.string.alphanumeric(4)}}`,
      jobType: getRandomValue(USER_JOBS),
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      assignmentId: faker.string.uuid(),
      status: getRandomValue(TASK_STATUS),
    })
  }
  return result
}

const post = http.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/task`, async ({ request }) => {
  const body = (await request.json()) as { userId: string; taskIds: string[] }
  const result = []
  const totalOccupancyRate = faker.number.float({ min: 10, max: 120, fractionDigits: 1 })
  if (body && body.taskIds.length > 0) {
    // タスクごとの占有率を生成
    const occupancyRates = divideTotalInt(totalOccupancyRate, body.taskIds.length, 1)
    for (let i = 0; i < body.taskIds.length; i++) {
      result.push({
        id: body.taskIds[i],
        name: `#{案件名_${faker.string.alphanumeric(8)}}`,
        priority: getRandomValue(TASK_PRIORITIES),
        status: getRandomValue(TASK_STATUS),
        startDate: faker.date.past().toISOString(),
        endDate: faker.date.future().toISOString(),
        occupancyRate: occupancyRates[i],
      })
    }
  }
  // 返却を遅延させる
  await delay(API_FETCHER_DELAY)
  // 返却
  return HttpResponse.json({
    id: body.userId,
    totalOccupancyRate: totalOccupancyRate,
    tasks: result,
  })
})

export const mockTaskRepositoryHandlers = [gets, get, post]
