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

test-unit:
	yarn test:unit

build-netlify:
	yarn prebuild

netlify:
	yarn start:lambda

netlify-harvest:
	yarn start:lambda:harvest

netlify-download:
	yarn start:lambda:download

ngrok:
	ngrok http 8080 -subdomain=rocket-invoice

# LAMBDA_DIR = src/lambda

# zip:
# 	rm -rf lambda-build
# 	mkdir lambda-build
# 	@for f in $(shell ls ${LAMBDA_DIR}); do \
# 		cd "${LAMBDA_DIR}/$${f}" ; \
# 	done
	# cd src/lambda/resume-download && npm install && chmod -R 777 node_modules && zip -r resume-download.zip *
  # mv src/lambda/resume-download/resume-download.zip lambda-build