#!/usr/bin/env node

// const chalk = require('chalk')
const Launcher = require('webdriverio').Launcher
const watch = require('@viewstools/morph/watch.js')
const path = require('path')

// if (help) {
//   console.log(`
//   views-e2e
//   `)

//   process.exit()
// }

const root = process.cwd()
const pkg = require(path.join(root, 'package.json'))
const isReactDom = 'react-dom' in pkg.dependencies

process.env.BABEL_ENV = 'e2e'
process.env.HEADLESS = true
process.env.REPORTER = 'dot'
process.env.BASE_URL = 'http://localhost:3000/'
process.env.VIEWS_E2E_TEST_ID = isReactDom ? 'data-test-id' : 'testID'

async function run() {
  await watch({
    as: 'e2e',
    once: true,
    src: path.join(root, 'src'),
  })

  try {
    const wdio = new Launcher(
      path.join(__dirname, isReactDom ? 'wdio.conf.js' : 'native.conf.js')
    )
    process.exit(await wdio.run())
  } catch (error) {
    console.error('Launcher failed to start the test', error)
    process.exit(1)
  }
}

run()
