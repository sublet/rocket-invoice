// https://bitsofco.de/how-to-use-puppeteer-in-a-netlifyws-lambda-function/
// https://github.com/ireade/netlify-puppeteer-screenshot-demo

const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

let url = 'https://jh-resume.netlify.com';

exports.handler = async (event, context, callback) => {

  try {

    // console.log(event.queryStringParameters)

    const site = event.queryStringParameters.site || null;

    if (!site || site === '') {
      throw new Error('You did not provide a site.');
    }

    url = `${url}/${site}?download=true`

    let chromiumPath = './node_modules/puppeteer/.local-chromium/mac-706915/chrome-mac/Chromium.app';
    if (process.env.NODE_ENV === 'production') {
      chromiumPath = await chromium.executablePath;
    }
    chromiumPath = await chromium.executablePath;
    const config = {
      executablePath: chromiumPath,
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      headless: chromium.headless,
    }
  
    // console.log(config)

    const pdfOptions = {
      format: 'A4',
      printBackground: true
    }
  
    const browser = await chromium.puppeteer.launch(config);
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.focus('body')
    await page.screenshot({ encoding: 'binary' });
    const pdf = await page.pdf(pdfOptions)
    await browser.close();

    const response = {
      headers: {
        'Content-type': 'application/pdf',
        'content-disposition': 'attachment; filename=jeffrey-hunter.pdf'
      },
      statusCode: 200,
      body: pdf.toString('base64'),
      isBase64Encoded: true
    }
    
    return callback(null, response)
    
  } catch(e) {
    return callback(e)
  }

}