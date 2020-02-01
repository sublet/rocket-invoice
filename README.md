# rocket-invoice

System allows you to connect to Harvest to pull in your hours and create an invoice that will be able to be downloaded or emailed.

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
