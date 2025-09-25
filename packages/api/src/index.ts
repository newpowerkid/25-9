import { Elysia } from 'elysia'

import { todosRouter } from './modules/todos'
import { bannerRouter } from './modules/banner'
import { priceRouter } from './modules/price'
import { scheduleRouter } from './modules/schedule'
import { kidRouter } from './modules/kid'
import { bookingRouter } from './modules/booking'
import { billRouter } from './modules/bill'

export const app = new Elysia({ prefix: '/api' })
  .use(todosRouter)
  .use(bannerRouter)
  .use(priceRouter)
  .use(scheduleRouter)
  .use(kidRouter)
  .use(bookingRouter)
  .use(billRouter)
  .get('/health', () => 'ok')

export type App = typeof app
