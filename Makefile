install:
	npm ci
publish:
	npm publish --dry-run
gendiff: 
	node bin/gendiff.js -h
lint:
	npx eslint .
test:
	node --experimental-vm-modules node_modules/.bin/jest --bail
test-coverage:
	npm test -- --coverage --coverageProvider=v8
gendiff-test-stylish:
	gendiff --format stylish __fixtures__/objFixtures/file1.json __fixtures__/objFixtures/file2.json
gendiff-test-plain:
	gendiff --format plain __fixtures__/objFixtures/file1.json __fixtures__/objFixtures/file2.json
gendiff-test-json:
	gendiff --format json __fixtures__/objFixtures/file1.json __fixtures__/objFixtures/file2.json