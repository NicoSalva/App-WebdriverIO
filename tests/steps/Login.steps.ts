import { Given, Then, When } from '@wdio/cucumber-framework';

import { expect } from "chai";
import { delay } from '../../utils/Methods';
import LoginPage from '../../src/pages/Login.page';

Given('a user at the applications start screen', async function () {
    await LoginPage.startedButtonChecked();
    await LoginPage.clickStartedButton();
});

When('the user enters the prefix and the phone number', async function (dataTable: any) {
    const userPhone = dataTable.rowsHash();
    const number = String(userPhone['number']);

    await LoginPage.clickPhonePrefix();
    await LoginPage.clickAfghanistan();
    await LoginPage.clickPhoneInput();
    await LoginPage.typePhoneInput(number);
    await LoginPage.clickContinueButton();
});

When('the user enters a Austria prefix and a bad phone number', async function (dataTable: any) {
    const userPhone = dataTable.rowsHash();
    const number = String(userPhone['number']);

    await LoginPage.clickPhonePrefix();
    await LoginPage.clickAustria();
    await LoginPage.clickPhoneInput();
    await LoginPage.typePhoneInput(number);
    await LoginPage.clickContinueButton();
});

When('confirms the verification code', async function (dataTable: any) {
    const userPhone = dataTable.rowsHash();
    const code = String(userPhone['code']);
    const verificationButton = await LoginPage.getContinueButton();

    expect(await verificationButton.isEnabled()).to.be.false;

    await LoginPage.typeVerificactionCode(code);

    expect(await verificationButton.isEnabled()).to.be.true;

    await LoginPage.clickVerificationContinueButton();

    await delay(3000);
});


Then('the user should be successfully logged into the application', async function () {
    const permissionValidation = await LoginPage.permissionRequestChecked();
    const descriptionValidation = await LoginPage.descriptionPermittionChecked();
    const howDoesValidation = await LoginPage.howDoesItChecked();
    const permissionButtonValidation = await LoginPage.permissionButtonChecked();
    const permissionButton = await LoginPage.getPermissionButton()

    expect(permissionValidation, 'Permissions request checkbox should be checked but was not').to.be.true;
    expect(descriptionValidation, 'Description for permission should be valid but was not').to.be.true;
    expect(howDoesValidation, 'How does it work information should be correct but was not').to.be.true;
    expect(permissionButtonValidation, 'Permission button should be valid but was not').to.be.true;
    expect(await permissionButton.isEnabled(), 'Permission button should be enabled but was not').to.be.true;
});

Then('the user sees all expected elements', async function () {
    const permissionText = await LoginPage.getTextPermissionRequest();
    const descriptionText = await LoginPage.getTextDescriptionPermission();
    const howDoesText = await LoginPage.getTextHowDoesIt();

    expect(permissionText, `Expected permission text to be 'Permissions Request' but found '${permissionText}'`).to.equal('Permissions Request');
    expect(descriptionText, `Expected description text to be the specific permission description but found '${descriptionText}'`).to.equal("In order for this app to work as well as possible, we'll ask you to agree to these permissions.");
    expect(howDoesText, `Expected 'How does it work?' text but found '${howDoesText}'`).to.equal('How does it work?');
    await delay(3000);
});

Then('the user should not be able to proceed beyond the login screen', async function () {
    const  validation = await LoginPage.enter6DigitChecked();
    const validationText = await LoginPage.getTextEnter6Digit();
   
    expect(validation, 'Expected to still be on the login screen due to a login error, but the element was not found').to.be.true;
    expect(validationText, `Expected the text to read 'Enter the 6 digit code' indicating the user is still on the login screen, but found '${validationText}'`).to.equal('Enter the 6 digit code');
});

Then('the user should not be able to proceed beyond the phone screen', async function () {
    // const  validation = await LoginPage.enter6DigitChecked();
    // const validationText = await LoginPage.getTextEnter6Digit();
   
    // expect(validation, 'Expected to still be on the login screen due to a login error, but the element was not found').to.be.true;
    // expect(validationText, `Expected the text to read 'Enter the 6 digit code' indicating the user is still on the login screen, but found '${validationText}'`).to.equal('Enter the 6 digit code');
});









