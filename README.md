# rocket-invoice

System allows you to connect to Harvest to pull in your hours and create an invoice that will be able to be downloaded or emailed.

## Inspiration

I've spent a lot of time engineering stupid shit for the sake of learning a new framework, language, or best practice.  Only difference in this one is that I am opening it up to my fellow contractors. Vue.js is just something I have never spent time getting to know, but it get's RAVE reviews, so here we are.

It was brought to my attention today that we have to invoice and put hours into Harvest.  I've owned my own business, and totally get it, but it's very redundant.  So lets over engineer the FUCK out of this.  

Here are the requirements:

1. We host this on Netlify and utilize the [Netlify Functions](https://www.netlify.com/products/functions/). 
* For oAuth2 token exchange
* Pulling timesheets from 
3. We use puppeteer to create a download or PDF

### Netlify Functions

http://localhost:9000/.netlify/functions/harvest-connect

### Todos

- [ ] Setup scafolding
- [ ] Setup hygen for templating
- [ ] 

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

#### Help me!

```
cp env.sample .env
```

Get OAuth info: https://id.getharvest.com/developers

Plug it in

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
