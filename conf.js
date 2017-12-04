//  conf.js
//  Created by Paul Lai on 20/10/2016.
//  Copyright (c)

exports.config = {
	framework: 'jasmine',
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['./tests/herokuapp.main.spec.js'],

	//Group by test types, to support tests scalability
	suites: {
		smoke: ["./tests/herokuapp.smoke.spec.js"], //protractor conf.js --suite smoke
		regression: ["./tests/herokuapp.regression.spec.js"] //protractor conf.js --suite regression
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

	//Runs on multiple web browsers to ensure cross-browsers compatibility    
	multiCapabilities: [{ 
		'browserName': 'chrome',
		'maxSessions': '1',		
	}, {
		'browserName': 'firefox',
		'maxSessions': '1',
	}],
}