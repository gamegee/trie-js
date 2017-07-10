This module is based on the work at [https://github.com/Travelport-Ukraine/npm-module-boilerplate.git](https://github.com/Travelport-Ukraine/npm-module-boilerplate.git).
Two remote repositories are kept:

- origin: the original one for updating/fixing purposes (DO ONLY PULLS), and 
- yotako: the one we use.


# Why? [![Build Status](https://travis-ci.org/.../yotako-....svg?branch=master)](https://travis-ci.org/.../yotako-...)
:page_with_curl: Boilerplate for npm/node module. Write with ES6 - have compatibility with all node versions.

This boilerplate is for people who want write code using all ES6 features ( and stage-2 ) but also want/need backwards compatibility with old node versions.

# Features
* Build with [Babel](https://babeljs.io). (ES6 -> ES5)
* Test with [mocha](https://mochajs.org).
* Cover with [istanbul](https://github.com/gotwarlost/istanbul).
* Check with [eslint](eslint.org).
* Deploy with [Travis](travis-ci.org).

# Commands
- `npm run clean` - Remove `lib/` directory
- `npm test` - Run tests. Tests can be written with ES6 (WOW!)
- `npm test:watch` - You can even re-run tests on file changes!
- `npm run cover` - Yes. You can even cover ES6 code.
- `npm run lint` - We recommend using [airbnb-config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb). It's fantastic.
- `npm run test:examples` - We recommend writing examples on pure JS for better understanding module usage.
- `npm run build` - Do some magic with ES6 to create ES5 code.
- `npm run prepublish` - Hook for npm. Do all the checks before publishing you module.

# Installation
Follow the steps below:
1. Clone this repo and remove `.git` folder.
2. Edit the package.json file and replace all the '...' by the name of your package.
3. npm install -g npm-check-updates
4. run "ncu" from the root directory of your folder and update the necessary packages. Test that all the commands in the readme still work as expected.
5. Update the README.md and CONTRIBUTING.md files as you want.
6. Create a new project in git.yotako.io under the 'yotako' group.
7. Follow the gitlab instructions to add files to the new repository from an existant folder (git init, git add origin ..., git add ., git commit..."

You are ready to go. You can npm link this package for local use.