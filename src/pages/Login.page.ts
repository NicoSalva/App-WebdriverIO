const PHONE_RECHARGE_BUTTON = '//*[@*="Recarga\nde celular"]'

import { AssertionError } from "chai";
import { loginLocators } from "../locators/Login.locators";
import BasePage from "./BasePage";

class LoginPage extends BasePage {

    elements = {
        startedButton: () => this.getElement(loginLocators.GET_STARTED_BUTTON),
        phonePrefix: () => this.getElement(loginLocators.PHONE_PREFIX),
        continueButton: () => this.getElement(loginLocators.INPUT_BUTTON),
        afghanistan: () => this.getElement(loginLocators.AFGHANISTAN_PHONE),
        austriaPosition: () => this.scrollToElement(loginLocators.AUSTRIA_PHONE, "down", 100, 50, 75),
        afghanistanPosition: () => this.scrollToElement(loginLocators.AFGHANISTAN_PHONE, "down", 100, 50, 75),
        phoneInput: () => this.getElement(loginLocators.PHONE_INPUT),
        verificationButton: () => this.getElement(loginLocators.VERIFICATION_BUTTON),

        verificationCode: (inputNumber: number) => {
            const locator = loginLocators.INPUT_GENERIC.replace('{n}', inputNumber.toString());
            return this.getElement(locator);
        },

        permissionRequest: () => this.getElement(loginLocators.PERMISSION_REQUEST_TEXT),
        descriptionPermission: () => this.getElement(loginLocators.DESCRIPTION_PERMISSION_TEXT),
        howDoesIt: () => this.getElement(loginLocators.HOW_DOES_IT_WORK_TEXT),
        permissionButton:() => this.getElement(loginLocators.PERMISSION_CONTINUE),
        enter6Digit:() => this.getElement(loginLocators.ENTER_6_DIGIT_TEXT)
    }

    async clickStartedButton() {
        this.tap(await this.elements.startedButton());
    }

    async startedButtonChecked() {
        this.waitForElementDisplayed(await this.elements.startedButton());
    }

    async clickPhonePrefix() {
        this.tap(await this.elements.phonePrefix());
    }

    async typeAfghanistan(prefix: string) {
        this.type(await this.elements.afghanistan(), prefix);
    }

    async afghanistanChecked() {
        return await this.waitForElementDisplayed(await this.elements.afghanistan());
    }

    async getTextAfghanistan() {
        return await this.getText(await this.elements.afghanistan());
    }

    async continueButtonChecked() {
        this.waitForElementDisplayed(await this.elements.continueButton());
    }

    async clickContinueButton() {
        this.tap(await this.elements.continueButton());
    }

    async clickAfghanistan() {
        await this.tap(await this.elements.afghanistanPosition());
    }

    async clickAustria() {
        await this.tap(await this.elements.austriaPosition());
    }

    async typePhoneInput(input: string) {
        this.type(await this.elements.phoneInput(), input);
    }

    async clickPhoneInput() {
        this.tap(await this.elements.phoneInput());
    }

    async getContinueButton() {
        return await this.elements.verificationButton();
    }

    async clickVerificationContinueButton() {
        this.tap(await this.elements.verificationButton());
    }

    async typeVerificactionCode(code: string) {
        if (code.length !== 6) {
            throw new Error("El código debe tener 6 dígitos.");
        }

        const digits = code.split('');

        // Asumiendo que los dígitos en 'digits' se corresponden con los inputs 1 a 6
        for (let i = 0; i < digits.length; i++) {
            const inputNumber = i + 1;  // Ajustando el índice para comenzar desde 1
            const verificationCodeElement = await this.elements.verificationCode(inputNumber);
            await this.type(verificationCodeElement, digits[i]);
        }
    }

    async getTextPermissionRequest(){
        return await this.getText(await this.elements.permissionRequest());
    }

    async getTextDescriptionPermission(){
        return await this.getText(await this.elements.descriptionPermission());
    }

    async getTextHowDoesIt(){
        return await this.getText(await this.elements.howDoesIt());
    }

    async permissionRequestChecked(){
        return await this.waitForElementExist(await this.elements.permissionRequest());
    }

    async descriptionPermittionChecked(){
        return await this.waitForElementExist(await this.elements.descriptionPermission());
    }

    async howDoesItChecked(){
        return await this.waitForElementExist(await this.elements.howDoesIt());
    }

    async permissionButtonChecked(){
        return await this.waitForElementExist(await this.elements.permissionButton());
    }

    async getPermissionButton() {
        return await this.elements.permissionButton();
    }

    async enter6DigitChecked(){
        return await this.waitForElementExist(await this.elements.enter6Digit());
    }

    async getTextEnter6Digit(){
        return await this.getText(await this.elements.enter6Digit());
    }

}

export default new LoginPage()