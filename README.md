{
  "name": "sudoku-toolbox",
  "version": "0.0.1",
  "description": "",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "dev": "tsc --watch",
    "prebuild": "rimraf dist",
    "build": "tsc",
    "postbuild": "ncp src/types dist/types && ncp package.json README.md LICENSE dist"
  },
  "keywords": [
    "generator",
    "solver",
    "areas",
    "sudoku"
  ],
  "author": "Shiyan7",
  "license": "ISC",
  "devDependencies": {
    "ncp": "^2.0.0",
    "rimraf": "^5.0.1",
    "ts-loader": "^9.4.4",
    "typescript": "^5.2.2"
  },
  "files": [
    "dist"
  ],
  "dependencies": {
    "sudoku-gen": "^1.0.2"
  }
}
