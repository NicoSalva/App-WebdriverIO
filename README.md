# Latch Mobile Framework

This project is a mobile automation framework utilizing WebdriverIO and Appium. It is set up to run tests on Android devices using the Cucumber BDD design pattern.

## Features

- Mobile test automation framework with WebdriverIO.
- Integration with Appium for communicating with Android devices.
- Utilization of the BDD pattern with Cucumber.
- Report generation with Allure.
- Local test execution capabilities.

## Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- Appium (v2.2.2 or higher)
- An Android emulator or a real device set up and ready to use.

## Installation

Clone this repository and navigate to the cloned directory. Install the dependencies using npm:

```
https://github.com/NicoSalva/LATCH-WebdriverIO.git
```
Once you have project cloned locally, goto project :

```
cd LATCH-WebdriverIO
```

Run the following command to install all the necessary dependencies for the project:

```
npm install
```

## Running Tests
To run all the tests on a local Android device, you can use the following command:
```
npm run android:local
```

You can run specific sets of tests by using tags. For example, to run all smoke tests, you can use:
```
TAG=@smoke npm run android:local
```
Similarly, to run only the tests related to login or logout features, you can use:
```
TAG=@login npm run android:local
```
or
```
TAG=@logout npm run android:local
```

## Reports
```
npm run allure
```
```
npm run open-allure
```
## Configuration
The main configuration file is wdio-config.ts, which includes all the necessary setup to run your tests. Ensure you update the capabilities and app path according to your device and the location of your APK.

## Hooks
The framework utilizes various WebdriverIO hooks to customize the test execution, such as beforeScenario and afterScenario, which help set up the environment before each scenario and clean up after each one.

## ABOUT THE SOLUTION

I'd like to provide some insights into my solution. Although it implements the Page Object Model (POM) architecture, I've made some modifications to make the project more practical. It's essential to remember that beyond any structure or implicit rule, the prime directive of a project should be to meet the required needs in the most practical manner. Thus, ensuring that we stay focused on the core objective of quality assurance and concentrate on the necessary outcomes.

Working with Cucumber enhances readability for the entire team, allowing individuals without technical expertise to understand our scenarios. That's why my initial approach included a configuration that enables tagging of features or scenarios, thereby allowing isolated test runs which facilitate setting up different pipeline executions.

Regarding the POM, I decided to create a BasePage class to abstract all common methods to our pages, such as tap, type, getElement, getText, and scroll. This approach helps us avoid code repetition across every page we create. Instead of establishing a page for each application screen, I focused on having a LoginPage for all login-related functionalities and only added Pages for screens that require interaction or hold significant importance. Often, frameworks become overloaded with multiple pages that are unclear in their purpose or contain very few declarations and methods.

I chose to work with Allure for reporting since it has always provided excellent results. It's also worth mentioning that if you want to test the solution with an Android phone connected to your PC, you should retrieve the device name using adb devices from the console and replace it in the capabilities.
