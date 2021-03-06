// https://bitsofco.de/how-to-use-puppeteer-in-a-netlifyws-lambda-function/
// https://github.com/ireade/netlify-puppeteer-screenshot-demo

// ?download=true&token=1777746.at.vFOjQFR4MxM2S8bmfX9CiBOBYJc-vkaxZmU9-YEzZViTEsyA02a3aOTu-Ew8nJQUCspCD1WbYmKxNAXTePONJQ&scope=harvest:279302&from=2020-01-01&to=2020-01-31&rate=140

// https://invoices.jeffreyhunter.me/.netlify/functions/invoice-download?token=1777746.at.cwVMF9Qm_wfoAmEkAC3sLK4-o6Y7L4fdVDa255HVQNTMygL8q1dxzpNkG8WfjnzRKJeKUYR6V_sV1JWutpRkgg&scope=harvest:279302&from=2020-01-01&to=2020-01-31&rate=140

const chromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

let HOST_URI = process.env.VUE_APP_PUPPETEER_SITE

exports.handler = async (event, context, callback) => {
  try {
    const { action, token, scope, from, to, rate, invoice, account, routing } = event.queryStringParameters

    if (!token) throw new Error('You did not provide a site.')
    if (!scope) throw new Error('You did not provide a scope.')
    if (!from) throw new Error('You did not provide a from.')
    if (!to) throw new Error('You did not provide a to.')
    if (!rate) throw new Error('You did not provide a rate.')
    if (!invoice) throw new Error('You did not provide a Invoice Number.')
    if (!account) throw new Error('You did not provide a Account Number.')
    if (!routing) throw new Error('You did not provide a Routing Number.')

    let url = `${HOST_URI}/?download=true&token=${token}&scope=${scope}&from=${from}&to=${to}&rate=${rate}&invoice=${invoice}&account=${account}&routing=${routing}`

    console.log('Hitting this HOST_URI: ', HOST_URI)
    console.log('Hitting this URL: ', url)

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

    if (action === 'email') {
      // TODO: Send email to ap@rocketinsights.com
    } else {
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
    }

  } catch (e) {
    return callback(e)
  }
}
