require('ts-node').register();

module.exports.config = {
    specs: ['spec.ts', 'specs/*.ts'],
    directConnect: true,
    baseUrl: 'https://movies-finder.firebaseapp.com/',
    SELENIUM_PROMISE_MANAGER: false,
    
    capabilities: { 
        browserName: 'chrome', 
        enableVNC: true,
        name: "Eduard" // Just to identify your session between others on selenoid ui
    },
    onPrepare: async function () {
    // Global implicit wait setup
    await browser.manage().timeouts().implicitlyWait(1000)
     
    afterEach(async function () {
    await browser.manage().timeouts().implicitlyWait(1000)
    })
     
    // Adding nice console output.
    let ConsoleReporter = require('jasmine2-reporter').Jasmine2Reporter
    let console_reporter_options = {
    startingSpec: true
    }
    jasmine.getEnv().addReporter(new ConsoleReporter(console_reporter_options))
    }
    }