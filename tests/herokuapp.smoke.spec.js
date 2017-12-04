//  herokuapp.smoke.spec.js
//  Created by Paul Lai on 23/10/2016.
//  Copyright (c)

var herokuapp = require('../pages/herokuapp.main.pageObject.js');

beforeEach(function () {
		isAngularSite(false);
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

afterAll(function() {
		browser.executeScript('window.sessionStorage.clear();'); //clear sessions
		browser.executeScript('window.localStorage.clear();'); //clear the local storage
	});

});
});