default:
	yarn install

lint:
	yarn lint

clean:
	rm -rf node_modules
	yarn cache clean
	yarn install

build:
	yarn build

start:
	yarn serve

serve:
	yarn serve

build:
	yarn build

test-unit
	yarn test:unit

build-netlify:
	yarn prebuild

netlify:
	yarn start:lambda

ngrok:
	ngrok http 8080 -subdomain=rocket-invoice