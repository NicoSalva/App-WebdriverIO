import { homeLocators } from "../locators/Home.locators";
import BasePage from "./BasePage";

class HomePage extends BasePage {

    elements = {
        
        welcomeText: () => this.getElement(homeLocators.WELCOME_TEXT),
        mainMenuId: () => this.getElement(homeLocators.MAIN_MENU_ID)
    }

    async welcomeTextChecked(){
        return this.waitForElementDisplayed(await this.elements.welcomeText());
    }

    async getWelcomeText(){
        return this.getText(await this.elements.welcomeText());
    }

    async clickMainMenuId(){
        this.tap(await this.elements.mainMenuId());
    }
}

export default new HomePage();