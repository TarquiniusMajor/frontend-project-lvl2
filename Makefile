install:
	npm ci
publish:
	npm publish --dry-run
gendiff: 
	node bin/gendiff.js -h
lint:
	npx eslint .
test:
	node --experimental-vm-modules node_modules/.bin/jest
test-coverage:
	npm test -- --coverage --coverageProvider=v8
