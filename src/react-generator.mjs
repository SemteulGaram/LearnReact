// module
import fs from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
// custom module
import Logger from './logger.mjs'
// react
import Index from '../react/index.js'

// initialize script
const fsp = fs.promises
const log = Logger.createLogger('ReactGenerator')

// react build script (../client + ../react -> ../build)
export async function buildReact() {
  log.i('Build React component...')
  const base = await fsp.readFile('../client/base.html', 'utf-8')

  await fsp.writeFile('../build/index.html', base.replace('<div id="root"></div>',
    '<div id="root">' + ReactDOMServer.renderToString(<Index />) + '</div>'), 'utf-8')
}
