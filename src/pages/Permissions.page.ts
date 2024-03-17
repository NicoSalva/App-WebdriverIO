import { permissionsLocators } from "../locators/Permissions.locators";
import BasePage from "./BasePage";

class PermissionsPage extends BasePage {


    elements = {

        permissionRequest: () => this.getElement(permissionsLocators.PERMISSION_REQUEST_TEXT),
        descriptionPermission: () => this.getElement(permissionsLocators.DESCRIPTION_PERMISSION_TEXT),
        howDoesIt: () => this.getElement(permissionsLocators.HOW_DOES_IT_WORK_TEXT),
        permissionButton: () => this.getElement(permissionsLocators.PERMISSION_CONTINUE),
        permissionLocationButton: () => this.getElement(permissionsLocators.PERMISSION_LOCATION_BUTTON),
        permissionNotificationButton: () => this.getElement(permissionsLocators.PERMISSION_NOTIFICATION_BUTTON),
        allowPermissionLocationButton: () => this.getElement(permissionsLocators.ALLOW_LOCATOR_BUTTON),
        allowPermissionNotificationButton: () => this.getElement(permissionsLocators.ALLOW_NOTIFICATION_LOCATOR_BUTTON),
        allowMsg: () => this.getElement(permissionsLocators.ALLOW_MSG),
    }

    async getTextPermissionRequest() {
        return await this.getText(await this.elements.permissionRequest());
    }

    async getTextDescriptionPermission() {
        return await this.getText(await this.elements.descriptionPermission());
    }

    async getTextHowDoesIt() {
        return await this.getText(await this.elements.howDoesIt());
    }

    async permissionRequestChecked() {
        return await this.waitForElementExist(await this.elements.permissionRequest());
    }

    async descriptionPermittionChecked() {
        return await this.waitForElementExist(await this.elements.descriptionPermission());
    }

    async howDoesItChecked() {
        return await this.waitForElementExist(await this.elements.howDoesIt());
    }

    async permissionButtonChecked() {
        return await this.waitForElementExist(await this.elements.permissionButton());
    }

    async getPermissionButton() {
        return await this.elements.permissionButton();
    }

    async clickPermissionButton() {
        this.tap(await this.elements.permissionButton());
    }

    async clickPermissionLocationButton() {
        this.tap(await this.elements.permissionLocationButton())
    }

    async clickPermissionNotificationButton() {
        this.tap(await this.elements.permissionNotificationButton())
    }

    async clickAllowPermissionLocationButton() {
        this.tap(await this.elements.allowPermissionLocationButton())
    }

    async clickAllowPermissionNotificationButton() {
        this.tap(await this.elements.allowPermissionNotificationButton())
    }

    async getTextPermissionLocationButton() {
        return this.getText(await this.elements.permissionLocationButton())
    }

    async getTextPermissionNotificationButton() {
        return this.getText(await this.elements.permissionNotificationButton())
    }

    async getNotificationButton() {
        return await this.elements.permissionNotificationButton();
    }

    async allowMsgDisplayed() {
        return await this.waitForElementDisplayed(await this.elements.allowMsg())
    }

    async getTextAllowMsg() {
        return await this.getText(await this.elements.allowMsg())
    }
}

export default new PermissionsPage()