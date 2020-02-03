# Rocket Invoice - (For contractors)

This system allows you to connect to Harvest to pull in your hours and create an invoice that will be able to be downloaded or emailed, (eventually.)

## Inspiration

I've spent a lot of time engineering stupid shit for the sake of learning a new framework, language, or best practice.  Only difference in this one is that I am opening it up to my fellow contractors. Vue.js is just something I have never spent time getting to know, but it get's RAVE reviews, so here we are.

It was brought to my attention today that we have to not only put in our hours into Harvest, but also send invoices.  In my book, that is way too much work, so let's over engineer the hell out of a solution and learn something in the process.

__IMPORTANT:__ I am not knocking this new practice, I've owned my own business, and totally get it...but it's very redundant.

#### Here are the requirements:

1. We host this on Netlify and utilize the [Netlify Functions](https://www.netlify.com/products/functions/).
2. We use puppeteer to create a download or PDF
3. Eventualy we save these PDF's to [Netlify Large Media](https://www.netlify.com/products/large-media/).
4. There should probably be more, I just can't think of any right now.

### Netlify Functions

http://localhost:9000/.netlify/functions/harvest
http://localhost:9000/.netlify/functions/invoice-download

#### API's and Import Docs

Harvest: https://help.getharvest.com/api-v2/
Harvest OAuth Setup: https://id.getharvest.com/developers

Netlify Lambda: https://github.com/netlify/netlify-lambda
Netlify Functions Overview: https://www.netlify.com/products/functions/
Netlify Functions Tutorial: https://travishorn.com/netlify-lambda-functions-from-scratch-1186f61c659e

## Project setup
```
make
```

## Wipe Dependencies and install fresh
```
make clean
```

### Compiles and hot-reloads for development
```
make serve OR make start
```

### Compiles and minifies for production
```
make build
```

### Run your unit tests
```
make test-unit
```

### Lints and fixes files
```
make lint
```

## Want to help make this better?

Want to help?  Come get some. Find me on Slack, or if you are old fashion, [email me](jeffhunter@rocketinsights.com)
