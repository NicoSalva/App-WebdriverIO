const PHONE_RECHARGE_BUTTON = '//*[@*="Recarga\nde celular"]'

import { AssertionError } from "chai";
import { homeLocators } from "../locators/Home.locators";
import BasePage from "./BasePage";

class HomePage extends BasePage {

    elements = {
        getStartedButton: () => this.getElement(homeLocators.GET_STARTED_BUTTON),
    }

    async clickGetStartedButton() {
        this.tap(await this.elements.getStartedButton());
    }

    async getStartedButtonChecked() {
        this.waitForElementDisplayed(await this.elements.getStartedButton());
    }
}

export default new HomePage()