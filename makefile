install: 
	npm install

publish:
	npm publish --dry-run

help:
	npx babel-node src/bin/gendiff.js -h

lint: 
	npx eslint .
