import { Given, Then, When } from '@wdio/cucumber-framework';
import { expect } from "chai";
import LoginPage from '../../src/pages/Login.page';
import PermissionsPage from '../../src/pages/Permissions.page';
import HomePage from '../../src/pages/Home.page';
import { delay } from '../../src/utils/Methods';

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

When('the user enters a Albania prefix and a bad phone number', async function (dataTable: any) {
    const userPhone = dataTable.rowsHash();
    const number = String(userPhone['number']);

    await LoginPage.clickPhonePrefix();
    await LoginPage.clickAlbania();
    await LoginPage.clickPhoneInput();
    await LoginPage.typePhoneInput(number);
    await LoginPage.clickContinueButton();
});

When('confirms the verification code', async function (dataTable: any) {
    const userPhone = dataTable.rowsHash();
    const code = String(userPhone['code']);
    const verificationButton = await LoginPage.elements.verificationButton();

    // Confirms that the verification button should initially be disabled
    expect(await verificationButton.isEnabled()).to.be.false;

    // After entering the code, the verification button should become enabled
    await LoginPage.typeVerificactionCode(code);
    expect(await verificationButton.isEnabled()).to.be.true;

    await LoginPage.clickVerificationContinueButton();
});

When('the user accepts the application permissions', async function () {
    // Checks if the permission button is valid and enabled, and verifies the related texts for permissions
    const permissionButtonValidation = await PermissionsPage.permissionButtonChecked();
    const permissionButton = await PermissionsPage.getPermissionButton();
    const permissionText = await PermissionsPage.getTextPermissionRequest();
    const descriptionText = await PermissionsPage.getTextDescriptionPermission();
    const howDoesText = await PermissionsPage.getTextHowDoesIt();

    // Ensures that the permission button is valid, enabled, and the texts are as expected
    expect(permissionButtonValidation, 'The permission button should be valid but it is not').to.be.true;
    expect(await permissionButton.isEnabled(), 'The permission button should be enabled but it is not').to.be.true;
    expect(permissionText, `Expected the permission text to be 'Permissions Request' but found '${permissionText}'`).to.equal('Permissions Request');
    expect(descriptionText, `Expected the description text to match the specific permission description but found '${descriptionText}'`).to.equal("In order for this app to work as well as possible, we'll ask you to agree to these permissions.");
    expect(howDoesText, `Expected 'How does it work?' text but found '${howDoesText}'`).to.equal('How does it work?');

     const textLocationButton = await PermissionsPage.getTextPermissionLocationButton();
    expect(textLocationButton, `Expected the location permission text to be 'Allow' but found '${textLocationButton}'`).to.equal('Allow');
    
    await PermissionsPage.clickPermissionLocationButton();
    await delay(500)

    const msg = await PermissionsPage.allowMsgDisplayed();
     const textMsg = await PermissionsPage.getTextAllowMsg()
     expect(msg).to.be.true;
     expect(textMsg, `'${textMsg}'`).to.equal(`Allow James Rider to access this device’s location?`);
    await PermissionsPage.clickAllowPermissionLocationButton();
    const textAllowedLocationButton = await PermissionsPage.getTextPermissionLocationButton();
    expect(textAllowedLocationButton, `Expected the location permission text to be 'Allowed' but found '${textAllowedLocationButton}'`).to.equal('Allowed');

    const textNotificationButton = await PermissionsPage.getTextPermissionNotificationButton();
    expect(textNotificationButton, `Expected the location permission text to be 'Allow' but found '${textNotificationButton}'`).to.equal('Allow');

     await PermissionsPage.clickPermissionNotificationButton();
    const notficationMsg = await PermissionsPage.allowMsgDisplayed();
     const textNotMsg = await PermissionsPage.getTextAllowMsg()
     expect(notficationMsg).to.be.true;
     expect(textNotMsg, `'${textNotMsg}'`).to.equal(`Allow James Rider to send you notifications?`);
    
     await PermissionsPage.clickAllowPermissionNotificationButton();
    const textAllowedNotificationButton = await PermissionsPage.getTextPermissionNotificationButton();
    expect(textAllowedNotificationButton, `Expected the location permission text to be 'Allowed' but found '${textAllowedNotificationButton}'`).to.equal('Allowed');

     await PermissionsPage.clickPermissionButton();

});

Then('the user should be successfully logged into the application', async function () {
    // Verifies the successful login with a welcome message
    const welcomeValidation = await HomePage.welcomeTextChecked();
    const textWelcomeValidation = await HomePage.getWelcomeText();
    expect(welcomeValidation, 'Expected to find the welcome message validation element but did not').to.be.true;
    expect(textWelcomeValidation, `Expected the welcome text to be 'Welcome to James!' but found '${textWelcomeValidation}'`).to.equal('Welcome to James!');
});

Then('the user should not be able to proceed beyond the login screen', async function () {
    // Checks that the user remains on the login screen due to an incorrect login attempt
    const validation = await LoginPage.enter6DigitChecked();
    const validationText = await LoginPage.getTextEnter6Digit();

    expect(validation, 'Expected to remain on the login screen due to an incorrect login attempt, but the expected element was not found').to.be.true;
    expect(validationText, `Expected the text to indicate staying on the login screen with 'Enter the 6 digit code' but found '${validationText}'`).to.equal('Enter the 6 digit code');
});

Then('the user should not be able to proceed beyond the phone screen', async function () {
    // Ensures that the user cannot proceed past the phone screen due to a phone number error
    const validation = await LoginPage.enterPhoneNumberChecked();
    const validationText = await LoginPage.getTextEnterPhoneNumber();

    expect(validation, 'Expected to remain on the phone screen due to an incorrect phone number, but the expected element was not found').to.be.true;
    expect(validationText, `Expected the text to indicate staying on the phone screen with 'Enter your phone number' but found '${validationText}'`).to.equal('Enter your phone number');
});