const puppeteer = require('puppeteer')
const launchChrome = require('@serverless-chrome/lambda')
const CDP = require('chrome-remote-interface')
const { sendWarning } = require('../../lib/slack')
const config = require('./config')
const getPriceAfterInput = require('./getPriceAfterInput')
const { PRODUCTION_VALIDATE_ORIGIN, LOCAL_VALIDATE_ORIGIN, LOCAL_CHROME_PATH, IS_LOCAL } = process.env

exports.main = async (event, context, callback) => {
  const aboutConfig = config.about
  const serviceConfig = Object.keys(config).filter(name => name !== 'about').map(name => config[name])

  let chrome
  let browser

  // 雑だけどpuppeteerのエラーも含めてまとめてcatch
  try {
    const chromeOptoin = IS_LOCAL
      ? { chromePath: LOCAL_CHROME_PATH }
      : {}

    chrome = await launchChrome(chromeOptoin)
    browser = await puppeteer.connect({
      browserWSEndpoint: (await CDP.Version()).webSocketDebuggerUrl
    })

    const baseUrl = IS_LOCAL
      ? LOCAL_VALIDATE_ORIGIN
      : PRODUCTION_VALIDATE_ORIGIN
    const aboutPage = await browser.newPage()
    const aboutUrl = `${baseUrl}${aboutConfig.path}`
    const usdjpy = await getPriceAfterInput(aboutPage, aboutUrl, aboutConfig)

    if (usdjpy < aboutConfig.range.min || usdjpy > aboutConfig.range.max) {
      throw new Error(`為替がおかしいです。\n${aboutUrl}`)
    }

    await Promise.all(serviceConfig.map(async service => {
      const serviceUrl = `${baseUrl}${service.path}`
      const servicePage = await browser.newPage()
      const price = await getPriceAfterInput(servicePage, serviceUrl, service)
      const priceInUsd = price / usdjpy

      if (priceInUsd < service.range.min || priceInUsd > service.range.max) {
        await sendWarning(`価格の計算がおかしいです。\n${serviceUrl}`)
      }
    }))
  } catch (err) {
    await sendWarning(err)
    callback(err)
  }

  await browser.close()
  await chrome.kill()

  callback(null)
}
