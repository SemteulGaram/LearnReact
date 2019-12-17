import { inspect } from 'util'
import chalk from 'chalk'

class GlobalLogger {
  constructor () {
    this.consoleLogLevel = 1
  }

  Level = {
    VERBOSE: 0,
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4
  }

  ReverseLevel = this.Level.keys()

  LevelColor = [
    'gray',
    'gray',
    'white',
    'yallow',
    'red'
  ]

  setConsoleLogLevel (type) {
    this.consoleLogLevel = type
  }

  createLogger (tag) {
    const logger = {
      verbose: (...args) => { this._base(GlobalLogger.Level.VERBOSE, tag, args) },
      debug: (...args) => { this._base(GlobalLogger.Level.DEBUG, tag, args) },
      info: (...args) => { this._base(GlobalLogger.Level.INFO, tag, args) },
      warn: (...args) => { this._base(GlobalLogger.Level.WARN, tag, args) },
      error: (...args) => { this._base(GlobalLogger.Level.ERROR, tag, args) }
    }

    // shortcuts (logger.info === logger.i)
    logger.keys().forEach(v => { logger[v[0]] = logger[v] })
    return logger
  }

  _base (type, tag, args) {
    // TODO: log file
    if (type >= this.consoleLogLevel) {
      console.log(chalk.cyan(this.buildTimeString() + '>')
        + chalk.green(tag + '>') + chalk[GlobalLogger.LevelColor[type]](
          GlobalLogger.ReverseLevel[type] + '> ' + args.map(v => {
            return (typeof v === 'object' && v !== null) ? inspect(v) : v
          }).join(' '))
      )
    }
  }

  buildTimeString() {
    const date = new Date()
    return date.getHours().toString().padStart(2, '0') + ':'
      + date.getMinutes().toString().padStart(2, '0') + ':'
      + date.getSeconds().toString().padStart(2, '0') + '.'
      + date.getMilliseconds().toString().padStart(4, '0')
  }
}

const globalInstance = new GlobalLogger()
export default globalInstance
