//  conf.js
//  Created by Paul Lai on 23/10/2016.
//  Copyright (c)

exports.config = {
	framework: 'jasmine',
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['./tests/herokuapp.main.spec.js'],

	//Group by test types, to support tests scalability
	suites: {
		smoke: ["./tests/herokuapp.smoke.spec.js"], //protractor conf-devices.js --suite smoke
		regression: ["./tests/herokuapp.regression.spec.js"] //protractor conf-devices.js --suite regression
	},

	//A semantic helper method to set AngularJS site flag
	onPrepare: function() {
		global.isAngularSite = function(flag){ 
			browser.ignoreSynchronization = !flag;
		};
	},

	//Pass options to Jasmine node
	jasmineNodeOpts: {
		isVerbose: true,
		showColors: true,
		includeStackTrace: true,
		defaultTimeoutInterval: 30000,
	},

	//Runs on multiple simulated devices to check website's responsiveness   
	multiCapabilities: [
		{
			browserName: 'chrome',
			'chromeOptions': {
				'mobileEmulation': {
				'deviceName': 'Apple iPad'
				}
			}
		},
		{
			browserName: 'chrome',
			'chromeOptions': {
				'mobileEmulation': {
				'deviceName': 'Google Nexus 5'
				}
			}
		},
		{
			browserName: 'chrome',
			'chromeOptions': {
			'mobileEmulation': {
			'deviceName': 'Apple iPhone 6'
				}
			}
		},
	],
}