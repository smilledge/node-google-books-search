test:
	@./node_modules/.bin/mocha --timeout 10000 --reporter spec
.PHONY: test
