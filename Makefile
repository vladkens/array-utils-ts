.PHONY: default fmt test

default:
	yarn format && yarn ci

fmt:
	yarn format

test:
	yarn test
