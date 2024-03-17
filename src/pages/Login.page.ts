import { loginLocators } from "../locators/Login.locators";
import BasePage from "./BasePage";

class LoginPage extends BasePage {

    elements = {

        startedButton: () => this.getElement(loginLocators.GET_STARTED_BUTTON),
        phonePrefix: () => this.getElement(loginLocators.PHONE_PREFIX),
        continueButton: () => this.getElement(loginLocators.INPUT_BUTTON),
        afghanistan: () => this.getElement(loginLocators.AFGHANISTAN_PHONE),
        albaniaPosition: () => this.scrollToElement(loginLocators.ALBANIA_PHONE, "down", 100, 50, 75),
        afghanistanPosition: () => this.scrollToElement(loginLocators.AFGHANISTAN_PHONE, "down", 100, 50, 75),
        phoneInput: () => this.getElement(loginLocators.PHONE_INPUT),
        verificationButton: () => this.getElement(loginLocators.VERIFICATION_BUTTON),
        verificationCode: (inputNumber: number) => {
            const locator = loginLocators.INPUT_GENERIC.replace('{n}', inputNumber.toString());
            return this.getElement(locator);
        },
        enter6Digit: () => this.getElement(loginLocators.ENTER_6_DIGIT),
        enterPhoneNumber: () => this.getElement(loginLocators.ENTER_PHONE_NUMBER)
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

    async clickAlbania() {
        await this.tap(await this.elements.albaniaPosition());
    }

    async typePhoneInput(input: string) {
        this.type(await this.elements.phoneInput(), input);
    }

    async clickPhoneInput() {
        this.tap(await this.elements.phoneInput());
    }

    async clickVerificationContinueButton() {
        this.tap(await this.elements.verificationButton());
    }

    async typeVerificactionCode(code: string) {
        if (code.length !== 6) {
            throw new Error("El código debe tener 6 dígitos.");
        }

        const digits = code.split('');
        for (let i = 0; i < digits.length; i++) {
            const inputNumber = i + 1;
            const verificationCodeElement = await this.elements.verificationCode(inputNumber);
            await this.type(verificationCodeElement, digits[i]);
        }
    }

    async enter6DigitChecked() {
        return await this.waitForElementExist(await this.elements.enter6Digit());
    }
    async getTextEnter6Digit() {
        return await this.getText(await this.elements.enter6Digit());
    }

    async enterPhoneNumberChecked() {
        return await this.waitForElementExist(await this.elements.enterPhoneNumber());
    }

    async getTextEnterPhoneNumber() {
        return await this.getText(await this.elements.enterPhoneNumber());
    }
}

export default new LoginPage()