import { Then, When } from '@wdio/cucumber-framework';
import { expect } from "chai";
import LoginPage from '../../src/pages/Login.page';
import HomePage from '../../src/pages/Home.page';
import AccountPage from '../../src/pages/Account.page';

When('the user attempts to log out of their account', async function () {
    await HomePage.clickMainMenuId();
    const accountTitleValidation = await AccountPage.getTextAccount();
    const signOutValidation = await AccountPage.getTextSignOut()

    expect(accountTitleValidation, `'${accountTitleValidation}'`).to.equal('Account');
    expect(signOutValidation, `'${signOutValidation}'`).to.equal('SIGN OUT');

    await AccountPage.clickSignOut();
});

Then('the user is successfully logged out', async function () {
    const enterPhoneNumberValidation = await LoginPage.getTextEnterPhoneNumber();
    const phoneInputValidation = await LoginPage.elements.phoneInput();

    expect(enterPhoneNumberValidation, `'${enterPhoneNumberValidation}'`).to.equal('Enter your phone number');
    expect(await phoneInputValidation.isEnabled(), '').to.be.true;
});