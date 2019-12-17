import Koa from 'koa'
import BodyParser from 'koa-bodyparser'
import Logger from 'koa-logger'
import Static from 'koa-static'
//import HttpStatus from 'http-status'

import routerApi from './server-api.mjs'

const app = new Koa()

const PORT = process.env.PORT || 3000

app.use(BodyParser())
app.use(Logger())

app.use(Static('./build'))
app.use(Static('./public'))
app.use(routerApi.routes()).use(routerApi.allowedMethods())

export function startServer () {
  app.listen(PORT, () => {
    console.log(`Server start at ${ PORT } port`)
  })
}
