import { accountLocators } from "../locators/Account.locators";
import BasePage from "./BasePage";

class AccountPage extends BasePage {

    elements = {
        
        account:() => this.getElement(accountLocators.ACCOUNT_TEXT),
        signOut:() => this.getElement(accountLocators.SIGN_OUT)
    }

    async getTextAccount(){
        return  this.getText(await this.elements.account())
    }

    async getTextSignOut(){
        return  this.getText(await this.elements.signOut())
    }

    async clickSignOut(){
        this.tap(await this.elements.signOut())
    }
}

export default new AccountPage();