const PHONE_RECHARGE_BUTTON = '//*[@*="Recarga\nde celular"]'

import { AssertionError } from "chai";
import { userPhoneLocators } from "../locators/UserPhone.locators";
import BasePage from "./BasePage";

class UserPhonePage extends BasePage {

    elements = {
        getPhonePrefix: () => this.getElement(userPhoneLocators.PHONE_PREFIX),
        getContinueButton: () => this.getElement(userPhoneLocators.CONTINUE_BUTTON),
        getAfghanistan: () => this.getElement(userPhoneLocators.AFGHANISTAN_PHONE),
        getAfghanistanPosition: () => this.scrollToElement(userPhoneLocators.AFGHANISTAN_PHONE, "down", 100, 50, 75),
        getPhoneInput: () => this.getElement(userPhoneLocators.PHONE_INPUT),
    }

    async clickPhonePrefix() {
        this.tap(await this.elements.getPhonePrefix());
    }

    async typeAfghanistan(prefix: string) {
        this.type(await this.elements.getAfghanistan(), prefix);
    }

    async afghanistanChecked() {
        return await this.waitForElementDisplayed(await this.elements.getAfghanistan());
    }

    async getTextAfghanistan() {
        return await this.getText(await this.elements.getAfghanistan());
    }

    async continueButtonChecked() {
        this.waitForElementDisplayed(await this.elements.getContinueButton());
    }

    async clickContinueButton() {
        this.tap(await this.elements.getContinueButton());
    }


    async clickAfghanistan() {

        await this.tap(await this.elements.getAfghanistanPosition());

    }

    async typePhoneInput(input: string) {
        this.type(await this.elements.getContinueButton(), input);
    }
}

export default new UserPhonePage()