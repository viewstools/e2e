const path = require('path')

module.exports = {
  config: {
    specs: [path.join(process.cwd(), 'src', '**', '*.e2e.js')],
    maxInstances: 10,
    capabilities: [
      {
        maxInstances: 5,
        browserName: 'chrome',
        pageLoadStrategy: 'normal',
        chromeOptions: {
          args: [
            process.env.HEADLESS && 'headless',
            'disable-extensions',
            'disable-infobars',
            'disable-gpu',
            'no-sandbox',
            'window-size=1280,1696',
          ].filter(Boolean),
        },
      },
    ],
    sync: true,
    logLevel: 'silent',
    coloredLogs: false,
    deprecationWarnings: false,
    bail: 0,
    screenshotPath: path.join(process.cwd(), 'e2e-error-shots/'),
    baseUrl: process.env.BASE_URL,
    waitforTimeout: 5000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: ['selenium-standalone'],
    framework: 'jasmine',
    reporters: process.env.REPORTER.split(','),
    // reporterOptions: {
    //   allure: {
    //     outputDir: './e2e-allure-results',
    //   },
    // },
    jasmineNodeOpts: {
      defaultTimeoutInterval: 999999999,
      expectationResultHandler(passed, assertion) {},
    },
    before(capabilities, specs) {
      require('babel-register')
    },
    afterTest(test) {
      if (test.passed === false) {
        return browser.saveScreenshot(
          path.join(process.cwd(), 'e2e-error-shots', `${test.title}.png`)
        )
      }
    },
  },
}
