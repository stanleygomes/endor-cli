[![CodeFactor](https://www.codefactor.io/repository/github/stanleygomes/endor-cli/badge)](https://www.codefactor.io/repository/github/stanleygomes/endor-cli)
![Lint and test](https://github.com/stanleygomes/endor-cli/workflows/Lint%20and%20test/badge.svg)

# Endor CLI

A Javascript Boilerplate Generator CLI. Come to javascript side 🚀 🌑

The main goal of **Endor CLI** is to make it easy to start a javascript project using great and minimal boilerplates.

*******
Table of contents
 1. [How to use](#startup)
 2. [Patterns and libs](#patterns)
 3. [Contribute](#contribute)
 4. [Gitflow recommendations](#gitflow)
*******

<div id='startup'/>

## How to use

```
npm i -g endor-cli
```

<div id='patterns'/>

## Patterns

These are some of patterns definitions to help us to keep a default arquitecture.

- Package manager: [npm](https://medium.com/@vincentnewkirk/npm-vs-yarn-2019-e88757b17038), sure
- Node version: [v10.x](https://nodejs.org/ca/blog/release/v10.16.3)
- Linter: eslint [standard](https://standardjs.com) pattern
- i18n: take a look [here](https://www.npmjs.com/package/i18n)
- Date and time: [moment](https://momentjs.com)
- Test: [Mocha](https://mochajs.org) & [Chai](https://www.chaijs.com)
- Logs: use [Winston](https://www.npmjs.com/package/winston)

<div id='contribute'/>

## How to get contribute

Step by step to get this up and running

**Clone repo and go to project folder**

```
git clone https://github.com/stanleygomes/endor-cli.git && cd endor-cli
```

**Install dependencies**

```bash
npm install
```

**Config enviroment**

Copy enviroment variables template

```bash
cp .env.template .env
```

**Start**

```bash
npm start
```

<div id='gitflow'/>

## Git flow

To file a new a feature

- create a branch from `master` branch. Use the pattern: `feature/description`
- file a pull request on `master` branch
- since your PR is aproved, it will be merged to `master` branch
- in a moment in time we'll create a release, using the pattern: `release/vX.X.X`
