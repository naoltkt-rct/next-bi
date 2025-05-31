/**
 * imports
 */
// packages
import { faker } from '@faker-js/faker/locale/ja'
import { http, HttpResponse, delay } from 'msw'

//
import { USER_JOBS } from '@/constants'
import { API_FETCHER_DELAY, getRandomInt, getRandomValue } from '@/mocks/utilities'

const gets = http.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user`, async () => {
  // データ生成
  const result = []
  for (let i = 0; i < 10; i++) {
    result.push({
      id: faker.string.uuid(),
      username: faker.person.fullName(),
      avatar: faker.image.urlPicsumPhotos(),
      job: getRandomValue(USER_JOBS),
      totalOccupancyRate: faker.number.float({ min: 10, max: 120, fractionDigits: 1 }),
    })
  }
  // 返却を遅延させる
  await delay(API_FETCHER_DELAY)
  // 返却
  return HttpResponse.json(result)
})

const get = http.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/:id`, async ({ params }) => {
  // ユーザー名
  const fixedUsername = faker.person.fullName()
  // 説明文
  const generateUserDescriptions = (names: string, repeats: number) => {
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
    username: fixedUsername,
    avatar: faker.image.urlPicsumPhotos(),
    job: getRandomValue(USER_JOBS),
    description: generateUserDescriptions(fixedUsername, getRandomInt(1, 8)),
    taskIds: getTaskArray(),
  })
})

const getTaskArray = () => {
  const result = []
  const max = getRandomInt(0, 5)
  for (let i = 0; i < max; i++) {
    result.push(faker.string.uuid())
  }
  return result
}

const post = http.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user`, async ({ request }) => {
  const body = (await request.json()) as { assignmentIds: string[] }
  const result = []
  if (body && body.assignmentIds.length > 0) {
    for (let i = 0; i < body.assignmentIds.length; i++) {
      result.push({
        id: body.assignmentIds[i],
        username: faker.person.fullName(),
        avatar: faker.image.urlPicsumPhotos(),
      })
    }
  }
  // 返却を遅延させる
  await delay(API_FETCHER_DELAY)
  // 返却
  return HttpResponse.json(result)
})

export const mockUserRepositoryHandlers = [gets, get, post]
