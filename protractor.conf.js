require('ts-node').register();

module.exports.config = {
    specs: ['spec.ts', 'specs/*.ts'],
    baseUrl: 'https://movies-finder.firebaseapp.com/',
    SELENIUM_PROMISE_MANAGER: false,
    
    capabilities: { 
        browserName: 'chrome', 
        enableVNC: true,
        name: "Eduard" // Just to identify your session between others on selenoid ui
    }
    }
