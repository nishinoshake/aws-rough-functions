module.exports = async (page, url, config) => {
  await page.goto(url)
  await page.waitForSelector(config.waitFor)

  if (config.actions && config.actions.length) {
    for (let i = 0; i < config.actions.length; i++) {
      const action = config.actions[i]

      await page[action.type](action.target, action.value)
    }
  }

  const price = await page.$eval(config.price.target, el => el.textContent)

  return price.replace(/,/g, '')
}
