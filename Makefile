install:
	npm ci
publish:
	npm publish --dry-run
gendiff: 
	node bin/gendiff.js -h
test:
	node bin/gendiff.js file1.json file2.json