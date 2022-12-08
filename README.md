# contacts-app

App for learning purposes

## Setup

1. Clone the repo: `git clone https://github.com/diegofrayo/contacts-app.git`
1. Install dependencies: `npm install`
1. Build the project by first time and keep watching when any TypeScript or SCSS file changes: `npm run watch`
1. Open the app on the browser: `npm run dev` or open `public/index.html` file using **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)**

## Live demo

**[demo-contacts-app.vercel.app](https://demo-contacts-app.vercel.app)**

## Important features

- DAO design pattern for data accessing | **[Source code](https://github.com/diegofrayo/contacts-app/tree/main/src/data/contacts)**
	- **[DAO Design Pattern | DigitalOcean | [digitalocean.com]](https://digitalocean.com/community/tutorials/dao-design-pattern)**
- **[zod](https://github.com/colinhacks/zod)** for type validations

## Resources

- Absolute paths on imports statements
	- **[Using absolute paths with TypeScript, Babel and Browserify | [broculos.net]](https://broculos.net/2017/10/using-absolute-paths-with-typescript.html)**
	- **[babel-plugin-module-resolver/DOCS.md at master · tleunen/babel-plugin-module-resolver | [github.com]](https://github.com/tleunen/babel-plugin-module-resolver/blob/master/DOCS.md)**
	- tsconfig
		```
		{
			"compilerOptions": {
				// Modules
				"baseUrl": ".",
				"paths": {
					"~/*": ["src/*"]
				},
				"moduleResolution": "node",
				"resolveJsonModule": true,

				// Language and environment
				"target": "es2022",
			},
			"include": ["src/**/*.ts"],
		}
		```
	- babel config
		```
		{
			"presets": ["@babel/preset-env"],
			"plugins": [
				[
					"module-resolver",
					{
						"root": ["./src"],
						"alias": {
							"~/components": "./src/components",
							"~/data": "./src/data",
							"~/lib": "./src/lib",
							"~/types": "./src/types",
							"~/utils": "./src/utils"
						}
					}
				]
			]
		}
		```
	- gulp config
		```
		var babelify = require("babelify");
		var watchedBrowserify =
			watchify(
				browserify({
					"basedir": ".",
					"entries": "src/main.ts"
					"debug": true,
					"cache": {},
					"packageCache": {}
				})
				.plugin(tsify)
				.transform(babelify, { "extensions": [".js", ".ts"] }) // IMPORTANT
			);
		```
- SASS
	- **[For, Each and While loops in Sass and SCSS - gavsblog | [gavsblog.com]](https://gavsblog.com/blog/for-each-while-loops-sass-scss)**
