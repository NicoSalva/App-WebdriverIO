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

