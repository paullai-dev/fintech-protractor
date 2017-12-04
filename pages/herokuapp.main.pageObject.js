//  herokuapp.main.pageObject.js
//  Created by Paul Lai on 20/10/2016.
//  Copyright (c)

'use strict';
  
var herokuapp = function() {
	
	//homepage controls
	this.searchButton = element(by.id("searchsubmit"));
	this.searchBox = element(by.id("searchbox"));	
	this.addNewComputers = element(by.id("add"));
	this.addNewComputersLink = element(by.linkText("Add a new computer"));
	this.homeLink = element(by.linkText("Play sample application — Computer database"));
	this.resultsTable = element(by.css("table.computers.zebra-striped"));
	this.previousPageDisabled = element(by.css("li.prev.disabled > a"));
	this.previousPageEnabled = element(by.css("li.prev > a"));  
	this.nextPageDisabled = element(by.css("li.next.disabled > a"));
	this.nextPageEnabled = element(by.css("li.next > a"));
	this.currentPage = element(by.css("li.current > a"));
 
	//new computer controls
	this.computerName = element(by.id("name"));
	this.introducedDate = element(by.id("introduced"));
	this.discontinuedDate = element(by.id("discontinued"));
	this.companySelector = element(by.css('select option:nth-child(3)'));//Let's spice things up & use a child selector here
	this.companyName = element(by.id('company')).element(by.css('option:checked'));//Parsing the selected company name to test methods
  
	this.createNew = element(by.css("input.btn.primary"));
	this.cancelNew = element(by.css("a.btn"));
	this.deleteNew = element(by.css("input.btn.danger"));
	this.errorValidation = element(by.css("div.clearfix.error"));
	this.messageSuccess = element(by.css("div.alert-message.warning"));

	//new computer labels
	this.labelnewComputer = element(by.css("#main > h1"));  
	this.labelComputerName = element(by.xpath("//section[@id='main']/form/fieldset/div[1]/label"));//Some good ol' xpaths wouldn't do any harm
	this.labelIntroducedDate = element(by.xpath("//section[@id='main']/form/fieldset/div[2]/label"));
	this.labelDiscontinuedDate = element(by.xpath("//section[@id='main']/form/fieldset/div[3]/label"));
	this.labelCompany = element(by.xpath("//section[@id='main']/form/fieldset/div[4]/label"));  

	//new computer help labels
	this.labelComputerNameHlp = element(by.xpath("//section[@id='main']/form/fieldset/div[1]/div/span"));
	this.labelIntroducedDateHlp = element(by.xpath("//section[@id='main']/form/fieldset/div[2]/div/span"));
	this.labelDiscontinuedDateHlp = element(by.xpath("//section[@id='main']/form/fieldset/div[3]/div/span"));

	//results table selectors
	this.computerfirstColumn = element(by.css("td > a"));
	this.noResults = element(by.css(".well"));
	this.computerColumn = element(by.css("table > tbody > tr > td:nth-child(1)"));//More fancy child selectors to play with
	this.introducedColumn = element(by.css("table > tbody > tr > td:nth-child(2)"));
	this.discontinuedColumn = element(by.css("table > tbody > tr > td:nth-child(3)"));
	this.companyColumn = element(by.css("table > tbody > tr > td:nth-child(4)"));
      
	this.navigate = function () {
		browser.get('http://computer-database.herokuapp.com/computers');
	};

	this.addComputers = function() {
		this.addNewComputers.click();
	};
      
	this.addComputer = function() {
		this.createNew.click();				
	};
	
	this.addCancel = function() {
		this.cancelNew.click();
	};

	this.searchComputers = function() {
		this.searchButton.click();
	};

	this.selectCompany = function() {
		this.companySelector.click();
	};

	this.viewComputer = function() {
		this.computerfirstColumn.click();
		browser.driver.sleep(2000);
  	};
  
	this.deleteComputer = function() {
		this.deleteNew.click();
		browser.driver.sleep(1000);
  	};

	this.goNext = function() {
		this.nextPageEnabled.click();
	};  
	
	this.goPrevious = function() {
		this.previousPageEnabled.click();
	};
	
	this.goHome = function() {
		this.homeLink.click();
	};

    this.setComputerName = function(name) {
		this.computerName.clear();
		this.computerName.sendKeys(name);
    };
	
    this.setIntroDate = function(date) {
		this.introducedDate.clear();
		this.introducedDate.sendKeys(date);
    };
	
    this.setExpiryDate = function(date) {
		this.discontinuedDate.clear();		
		this.discontinuedDate.sendKeys(date);
    };

    this.setFilter = function(string) {
		this.searchBox.clear();		
		this.searchBox.sendKeys(string);
    };	
	
    this.resetFilter = function() {
		this.searchBox.clear();		
		this.searchBox.sendKeys(protractor.Key.ENTER);
    };	
			
};

module.exports = herokuapp;