# FinTech-protractor

This is an example showing Protractor end-to-end tests for a non-angular application that includes a page object and a simple helper method.

The application being tested is a website. 

Mobile emulation is also included as a part of the implementation.

## To clone
```
git clone https://github.com/paulvanalmere/fintech-protractor.git
```
## To run a Smoke Test
```
cd fintech-protractor
protractor conf.js --suite smoke
```
## To run a Regression Test
```
cd fintech-protractor
protractor conf.js --suite regression
```
## To run a Smoke Test (Mobile emulation)
```
cd fintech-protractor
protractor conf-devices.js --suite smoke
```
## To run a Regression Test (Mobile emulation)
```
cd fintech-protractor
protractor conf-devices.js --suite regression
