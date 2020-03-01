install: 
	npm install

publish:
	npm publish --dry-run

build:
	npm run build --if-present

help:
	npx babel-node src/bin/gendiff.js -h

lint:
	npx eslint .

test:
	npm run test

test-coverage:
	npx jest --coverage