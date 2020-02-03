// https://bitsofco.de/how-to-use-puppeteer-in-a-netlifyws-lambda-function/
// https://github.com/ireade/netlify-puppeteer-screenshot-demo

require('dotenv').config()

const chromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

let url = process.env.PUPPETEER_SITE

exports.handler = async (event, context, callback) => {
  try {
    const { token, scope, from, to, rate } = event.queryStringParameters

    if (!token) throw new Error('You did not provide a site.')
    if (!scope) throw new Error('You did not provide a scope.')
    if (!from) throw new Error('You did not provide a from.')
    if (!to) throw new Error('You did not provide a to.')
    if (!rate) throw new Error('You did not provide a rate.')

    url = `${url}/dashboard?download=true&token=${token}&scope=${scope}&dateFrom=${from}&dateTo=${to}&hourlyRate=${rate}`

    console.log('#### URL: ', url)

    let chromiumPath = './node_modules/puppeteer/.local-chromium/mac-706915/chrome-mac/Chromium.app'
    if (process.env.NODE_ENV === 'production') {
      chromiumPath = await chromium.executablePath
    }
    chromiumPath = await chromium.executablePath
    const config = {
      executablePath: chromiumPath,
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      headless: chromium.headless
    }

    // console.log(config)

    const pdfOptions = {
      format: 'A4',
      printBackground: true
    }

    const browser = await chromium.puppeteer.launch(config)
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle0' })
    await page.focus('body')
    await page.screenshot({ encoding: 'binary' })
    const pdf = await page.pdf(pdfOptions)
    await browser.close()

    const response = {
      headers: {
        'Content-type': 'application/pdf',
        'content-disposition': 'attachment; filename=invoice.pdf'
      },
      statusCode: 200,
      body: pdf.toString('base64'),
      isBase64Encoded: true
    }

    return callback(null, response)
  } catch (e) {
    return callback(e)
  }
}
