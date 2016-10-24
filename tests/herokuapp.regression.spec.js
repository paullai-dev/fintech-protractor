//  herokuapp.main.spec.js
//  Created by Paul Lai on 20/10/2016.
//  Copyright (c)

var herokuapp = require('../pages/herokuapp.main.pageObject.js');

beforeEach(function () {
		isAngularSite(false); //flagged to prevent interference with Protractor's bootstrapping on non-angular pages
	});

describe('herokuapp', function() {
	it('should open the computers database', function() {
		var page = new herokuapp();
		page.navigate();
	});

//BB-0001
describe('herokuapp', function() {
	it('should have a title', function() {
		var page = new herokuapp();
		expect(browser.driver.getTitle()).toEqual("Computers database");
	});

//BB-0002
describe('herokuapp', function() {
	it('should make sure UI elements on the homepage are present', function() {
		var page = new herokuapp();
		expect(page.homeLink.isDisplayed()).toBe(true);
		expect(page.labelnewComputer.getText()).toContain("computers found");
		expect(page.addNewComputersLink.isDisplayed()).toBe(true);
		expect(page.searchButton.isDisplayed()).toBe(true);
		expect(page.searchButton.getAttribute("value")).toEqual("Filter by name");
		expect(page.searchBox.isDisplayed()).toBe(true);
		expect(page.searchBox.getAttribute("placeholder")).toEqual("Filter by computer name...");
		expect(page.resultsTable.isDisplayed()).toBe(true);
		expect(page.previousPageDisabled.isDisplayed()).toBe(true);
		expect(page.nextPageEnabled.isDisplayed()).toBe(true);
		expect(page.currentPage.isDisplayed()).toBe(true);
		});
	});

//BB-0003
describe('herokuapp', function() {
	it('should make sure UI elements in new computers page are present', function() {
		var page = new herokuapp();
	  	page.addComputers();

		expect(page.labelnewComputer.getText()).toEqual("Add a computer");
		expect(page.labelComputerName.getText()).toEqual("Computer name");
		expect(page.labelIntroducedDate.getText()).toEqual("Introduced date");
		expect(page.labelDiscontinuedDate.getText()).toEqual("Discontinued date");
		expect(page.labelCompany.getText()).toEqual("Company");

		expect(page.labelComputerNameHlp.getText()).toEqual("Required");
		expect(page.labelIntroducedDateHlp.getText()).toEqual("Date ('yyyy-MM-dd')");
		expect(page.labelDiscontinuedDateHlp.getText()).toEqual("Date ('yyyy-MM-dd')");

		expect(page.createNew.isDisplayed()).toBe(true);
		expect(page.cancelNew.isDisplayed()).toBe(true);

	    });
	});

//BB-0004
describe('herokuapp', function() {
	it('should not add a computer without a name', function() {
		var page = new herokuapp();
		expect(page.createNew.getAttribute('value')).toEqual("Create this computer");//When creating instead of editing, the text is Create instead of Save!		
		page.addComputer();

		expect(page.labelnewComputer.isDisplayed()).toBe(true);
		expect(page.errorValidation.getCssValue("background-color")).toBe("rgba(250, 229, 227, 1)"); //make sure the error is color-coded red

		});
	});

//BB-0005
describe('herokuapp', function() {
	it('should add a computer with just a name', function() {
		var page = new herokuapp();

		page.setComputerName("Winterfell Computers #1");
		expect(page.computerName.getAttribute('value')).toEqual("Winterfell Computers #1");
		expect(page.introducedDate.getAttribute('value')).toEqual('');
		expect(page.discontinuedDate.getAttribute('value')).toEqual('');

		page.addComputer();

		expect(browser.getCurrentUrl()).toEqual('http://computer-database.herokuapp.com/computers');
		expect(page.messageSuccess.getText()).toEqual("Done! Computer Winterfell Computers #1 has been created");
		expect(page.messageSuccess.getCssValue("background-color")).toBe("rgba(238, 220, 148, 1)"); //make sure the error is color-coded yellow

	  	});
	});

//BB-0006
describe('herokuapp', function() {
	it('should add a computer with an existing name', function() {
	  	var page = new herokuapp();
		page.addComputers();

		page.setComputerName("Winterfell Computers #1");		
	  	expect(page.computerName.getAttribute('value')).toEqual("Winterfell Computers #1");
	  	expect(page.introducedDate.getAttribute('value')).toEqual('');
	  	expect(page.discontinuedDate.getAttribute('value')).toEqual('');

	  	page.addComputer();

	  	expect(browser.getCurrentUrl()).toEqual('http://computer-database.herokuapp.com/computers');
	  	expect(page.messageSuccess.getText()).toEqual("Done! Computer Winterfell Computers #1 has been created");
	  	expect(page.messageSuccess.getCssValue("background-color")).toBe("rgba(238, 220, 148, 1)"); //make sure the error is color-coded yellow

	  	});
	});

//BB-0007
describe('herokuapp', function() {
	it('should add a computer with complete information', function() {
		var page = new herokuapp();
		page.addComputers();

		page.setComputerName("Winterfell Computers #2");		
		expect(page.computerName.getAttribute('value')).toEqual("Winterfell Computers #2");

		page.setIntroDate("2016-10-22");		
		expect(page.introducedDate.getAttribute('value')).toEqual("2016-10-22");

		page.setExpiryDate("2017-10-21");
		expect(page.discontinuedDate.getAttribute('value')).toEqual("2017-10-21");

		page.selectCompany();
		expect(page.companyName.getText()).toEqual("Thinking Machines");//receives the selected computer name from pageObject & match the text

		page.addComputer();
		expect(browser.getCurrentUrl()).toEqual('http://computer-database.herokuapp.com/computers');
		expect(page.messageSuccess.getText()).toEqual("Done! Computer Winterfell Computers #2 has been created");
		expect(page.messageSuccess.getCssValue("background-color")).toBe("rgba(238, 220, 148, 1)"); //make sure the error is color-coded yellow

		page.setFilter("Winterfell Computers #2");
		page.searchComputers();

		expect(page.computerColumn.getText()).toEqual("Winterfell Computers #2");
		expect(page.introducedColumn.getText()).toEqual("22 Oct 2016");
		expect(page.discontinuedColumn.getText()).toEqual("21 Oct 2017");
		expect(page.companyColumn.getText()).toEqual("Thinking Machines");

		});
	});

//BB-0008
describe('herokuapp', function() {
	it('should view the details of an existing computer', function() {
		var page = new herokuapp();
		page.addComputers();

		page.setComputerName("Winterfell Computers #3");		
		expect(page.computerName.getAttribute('value')).toEqual("Winterfell Computers #3");

		page.setIntroDate("2016-11-01");		
		expect(page.introducedDate.getAttribute('value')).toEqual("2016-11-01");

		page.setExpiryDate("2017-10-31");
		expect(page.discontinuedDate.getAttribute('value')).toEqual("2017-10-31");

		page.selectCompany();
		expect(page.companyName.getText()).toEqual("Thinking Machines");

		page.addComputer();
		expect(browser.getCurrentUrl()).toEqual('http://computer-database.herokuapp.com/computers');
		expect(page.messageSuccess.getText()).toEqual("Done! Computer Winterfell Computers #3 has been created");
		expect(page.messageSuccess.getCssValue("background-color")).toBe("rgba(238, 220, 148, 1)");

		page.setFilter("Winterfell Computers #3");		
		page.searchComputers();
		page.viewComputer();

		expect(page.computerName.getAttribute('value')).toEqual("Winterfell Computers #3");
		expect(page.introducedDate.getAttribute('value')).toEqual("2016-11-01");
		expect(page.discontinuedDate.getAttribute('value')).toEqual("2017-10-31");
		expect(page.companyName.getText()).toEqual("Thinking Machines");

		page.addCancel();

		});
	});

//BB-0009
describe('herokuapp', function() {
	it('should not be able to view a non-existing computer', function() {
		var page = new herokuapp();

		page.setFilter("How far down the rabbit hole?");		
		page.searchComputers();

		expect(page.labelnewComputer.getText()).toEqual("No computers found");
		expect(page.noResults.getText()).toEqual("Nothing to display");
		expect(page.resultsTable.isPresent()).toBe(false);

		});
	});

//BB-0014
describe('herokuapp', function() {
	it('should update all information on an existing computer', function() {
		var page = new herokuapp();
		page.searchBox.clear();

		page.setFilter("Winterfell Computers #1");		
		page.searchComputers();

		page.viewComputer();

		expect(page.computerName.getAttribute('value')).toEqual("Winterfell Computers #1");
		expect(page.introducedDate.getAttribute('value')).toEqual("");
		expect(page.discontinuedDate.getAttribute('value')).toEqual("");
		expect(page.companyName.getText()).toEqual("-- Choose a company --");

		page.setComputerName("Winterfell Computers #4");
		page.setIntroDate("2016-12-01");		
		page.setExpiryDate("2016-12-31");
		page.selectCompany();

		expect(page.createNew.getAttribute('value')).toEqual("Save this computer");//When editing instead of creating, the text changes from Create to Save!
		page.addComputer();

		expect(page.messageSuccess.getText()).toEqual("Done! Computer Winterfell Computers #4 has been updated");
		expect(page.messageSuccess.getCssValue("background-color")).toBe("rgba(238, 220, 148, 1)");

		page.setFilter("Winterfell Computers #4");		
		page.searchComputers();

		page.viewComputer();

		expect(page.computerName.getAttribute('value')).toEqual("Winterfell Computers #4");
		expect(page.introducedDate.getAttribute('value')).toEqual("2016-12-01");
		expect(page.discontinuedDate.getAttribute('value')).toEqual("2016-12-31");
		expect(page.companyName.getText()).toEqual("Thinking Machines");

		page.addCancel();

		});
	});

//BB-0015
describe('herokuapp', function() {
	it('should not update if the editing is cancelled', function() {
		var page = new herokuapp();
		page.searchBox.clear();

		page.setFilter("Winterfell Computers #4");		
		page.searchComputers();

		page.viewComputer();

		page.setComputerName("Winterfell Computers #99");		
		page.setIntroDate("2016-01-01");		
		page.setExpiryDate("2016-01-31");

		page.addCancel();

		expect(browser.getCurrentUrl()).toEqual('http://computer-database.herokuapp.com/computers');

		page.setFilter("Winterfell Computers #4");		
		page.searchComputers();

		page.viewComputer();

		expect(page.computerName.getAttribute('value')).toEqual("Winterfell Computers #4");
		expect(page.introducedDate.getAttribute('value')).toEqual("2016-12-01");
		expect(page.discontinuedDate.getAttribute('value')).toEqual("2016-12-31");
		expect(page.companyName.getText()).toEqual("Thinking Machines");

		page.addCancel();

		});
	});

//BB-0016
describe('herokuapp', function() {
	it('should delete an existing computer', function() {
		var page = new herokuapp();
		page.addComputers();
		page.setComputerName("Winterfell Computers #5");		
		expect(page.computerName.getAttribute('value')).toEqual("Winterfell Computers #5");

		page.addComputer();

		expect(browser.getCurrentUrl()).toEqual('http://computer-database.herokuapp.com/computers');

		page.setFilter("Winterfell Computers #5");		
		page.searchComputers();

		page.viewComputer();
		page.deleteComputer();

		expect(page.messageSuccess.getText()).toEqual("Done! Computer has been deleted");
		expect(page.messageSuccess.getCssValue("background-color")).toBe("rgba(238, 220, 148, 1)"); //make sure the error is color-coded yellow

		});
	});

//BB-0017
describe('herokuapp', function() {
	it('should validate incorrect introduced date format', function() {
		var page = new herokuapp();
		page.addComputers();
		page.setComputerName("Winterfell Computers #6");
		page.setIntroDate("22102016");

		page.addComputer();

		expect(page.errorValidation.getCssValue("background-color")).toBe("rgba(250, 229, 227, 1)"); //make sure the error is color-coded red
		page.addCancel();

		});
	});

//BB-0018
describe('herokuapp', function() {
	it('should validate incorrect discontinued date format', function() {
		var page = new herokuapp();
		page.addComputers();
		page.setComputerName("Winterfell Computers #7");
		page.setExpiryDate("22102017");		

		page.addComputer();

		expect(page.errorValidation.getCssValue("background-color")).toBe("rgba(250, 229, 227, 1)"); //make sure the error is color-coded red
		page.addCancel();

		});
	});

//BB-0019
describe('herokuapp', function() {
	it('should not be able to pull off cross-site scripting attack', function() {
		var page = new herokuapp();
		page.setFilter("<script>alert('hello')</script>");	
		page.searchComputers();

		expect(page.labelnewComputer.getText()).toEqual("No computers found");
		expect(page.noResults.getText()).toEqual("Nothing to display");
		expect(page.resultsTable.isPresent()).toBe(false);

		});
	});

//BB-0024
describe('herokuapp', function() {
	it('should navigate to the Next page', function() {
		var page = new herokuapp();
		page.resetFilter();

		expect(page.currentPage.getText()).toContain("Displaying 1 to 10");
		page.goNext();
		expect(page.currentPage.getText()).toContain("Displaying 11 to 20");

		});
	});

//BB-0025
describe('herokuapp', function() {
	it('should navigate to the Previous page', function() {
		var page = new herokuapp();

		expect(page.currentPage.getText()).toContain("Displaying 11 to 20");
		page.goPrevious();
		expect(page.currentPage.getText()).toContain("Displaying 1 to 10");

		});
	});

//BB-0026
describe('herokuapp', function() {
	it('should go directly to new computer page via URL change', function() {
		var page = new herokuapp();

		browser.get('http://computer-database.herokuapp.com/computers/new')
		expect(page.labelnewComputer.getText()).toEqual("Add a computer");

		});
	});

//BB-0027
describe('herokuapp', function() {
	it('should have a shortcut to Homepage and should work', function() {
		var page = new herokuapp();

		expect(page.homeLink.getText()).toEqual("Play sample application — Computer database");
		expect(page.homeLink.getAttribute('href')).toEqual("http://computer-database.herokuapp.com/");
		page.goHome();
		expect(browser.getCurrentUrl()).toEqual('http://computer-database.herokuapp.com/computers');

		});
	});

afterAll(function() {
		browser.executeScript('window.sessionStorage.clear();'); //clear sessions
		browser.executeScript('window.localStorage.clear();'); //clear the local storage
	});

});
});