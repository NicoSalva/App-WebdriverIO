import { Given, Then, When } from '@wdio/cucumber-framework';
import HomePage from '../../src/pages/Home.page';
import { expect } from "chai";
import UserPhonePage from '../../src/pages/UserPhone.page';
import { delay } from '../../utils/Methods';

Given('a user at the applications start screen', async function () {
    await HomePage.getStartedButtonChecked();
    await HomePage.clickGetStartedButton();
});

When('the user enters the prefix and the phone number', async function (dataTable: any) {
    const userPhone = dataTable.rowsHash();
    const prefix = String(userPhone['prefix']);
    const number = String(userPhone['number']);

    await UserPhonePage.clickPhonePrefix();
    await UserPhonePage.clickAfghanistan();
    await UserPhonePage.typePhoneInput(number);
    await delay(20000);
    await UserPhonePage.clickContinueButton();
    await delay(20000);
});

//the user enters the phone number "701111112"

