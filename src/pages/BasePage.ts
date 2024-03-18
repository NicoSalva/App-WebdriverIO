import { WaitForOptions } from "webdriverio";
import Gestures from "../utils/Gestures";

export default class BasePage {

    /**
     * Taps (clicks) on an element specified by its selector.
     *
     * @param {WebdriverIO.Element} element - The element to interact with.
     */
    async tap(element: WebdriverIO.Element) {
        try {
            await element.click();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Types text into a form field identified by its selector.
     *
     * @param {WebdriverIO.Element} element - The target element.
    * @param {string | number} text - The text to enter into the field.
     */
    async type(element: WebdriverIO.Element, text: string | number) {
        try {
            await element.setValue(text);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves the displayed text of an element specified by its selector.
     *
     * @param {WebdriverIO.Element} element - The element in question.
     * @returns {Promise<string>} The element's text.
     */
    async getText(element: WebdriverIO.Element): Promise<string> {
        try {
            return await element.getText();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fetches a mobile element by its selector, waiting for a specified time.
     * 
     * @param {string} locator - The element's locator.
     * @param {number} [time=5] - Wait time in seconds (default is 5).
     * @returns {Promise<WebdriverIO.Element>} The resolved element.
     */
    async getElement(locator: string, time: number = 5): Promise<WebdriverIO.Element> {
        try {
            const element = await driver.$(locator);

            const timeOut: WaitForOptions = { timeout: time * 1000 }; // Convierte segundos a milisegundos

            await element.waitForDisplayed(timeOut);
            return element;
        } catch (error) {
            console.error(`Error al obtener el elemento para el localizador ${locator}:`, error);
            throw new Error(`No se pudo obtener el elemento para el localizador: ${locator}`);
        }
    }

    /**
     * Waits for an element to be visible based on its locator, retrying up to a max limit.
     * 
     * @param {string} locator - The element's locator.
     * @param {number} [maxRetries=5] - Max retry attempts (default is 5).
     * @param {number} [waitTime=5000] - Wait time per attempt in milliseconds (default is 5000 ms).
     * @returns {Promise<WebdriverIO.Element>} The element once visible.
     */
    async getWaitElement(locator: string, maxRetries: number = 5, waitTime: number = 5000): Promise<WebdriverIO.Element> {
        let retries = 0;
        let element;

        while (retries < maxRetries) {
            try {
                element = await driver.$(locator);
                await element.waitForDisplayed({ timeout: waitTime });
                return element;
            } catch (error) {
                console.log(`Intento ${retries + 1}/${maxRetries}: El elemento no está visible aún.`);
                retries++;
                if (retries >= maxRetries) {
                    console.error(`El elemento con el localizador '${locator}' no se hizo visible después de ${maxRetries} intentos.`);
                    throw new Error(`El elemento con el localizador '${locator}' no se hizo visible después de ${maxRetries} intentos.`);
                }

                await new Promise(resolve => setTimeout(resolve, 2000)); // Espera de 2 segundo entre intentos
            }
        }

        throw new Error(`Error inesperado: El elemento con el localizador '${locator}' no pudo ser recuperado.`);
    }

    /**
     * Waits for an element to appear on the screen.
     * 
     * @param {WebdriverIO.Element} element - The element to wait for.
     * @returns {Promise<boolean>} True if displayed, false otherwise.
     */
    async waitForElementDisplayed(element: WebdriverIO.Element): Promise<boolean> {
        return await element.waitForDisplayed({ timeout: 6000 });
    }

    /**
     * Waits for an element to exist.
     * 
     * @param {WebdriverIO.Element} element - The element to check for existence.
     * @returns {Promise<boolean>} True if exists, false otherwise.
     */
    async waitForElementExist(element: WebdriverIO.Element): Promise<boolean> {
        return await element.waitForExist({ timeout: 9000 });
    }

    /**
     * Scrolls to an element specified by a locator, in a given direction.
     * 
     * @param {string} locator - The element's locator.
     * @param {string} direction - The scroll direction ('up' or 'down').
     * @param {number} intensity - The scroll intensity.
     * @param {number} startX - The starting X percentage.
     * @param {number} startY - The starting Y percentage.
     * @returns {Promise<WebdriverIO.Element>} The element, if found and visible.
     */
    async scrollToElement(locator: string, direction: string, intensity: number = 20, startX: number = 50, startY: number = 50): Promise<WebdriverIO.Element> {
        const maxRetries = 12;
        if (typeof intensity !== 'number' || intensity <= 0) {
            throw new Error('Intensity must be a positive number.');
        }
        if (typeof startX !== 'number' || startX < 0 || startX > 100) {
            throw new Error('The startX value must be a number between 0 and 100.');
        }
        if (typeof startY !== 'number' || startY < 0 || startY > 100) {
            throw new Error('The startY value must be a number between 0 and 100.');
        }

        if (!['up', 'down'].includes(direction)) {
            throw new Error(`The provided direction '${direction}' is invalid. It must be 'up' or 'down'.`);
        }

        let retries = 0;
        while (retries < maxRetries) {
            try {
                const element = await driver.$(locator);
                if (await element.isDisplayed()) {
                    console.log('Element found and visible');
                    return element;
                } else {
                    console.log(`Element found but not visible, scrolling ${direction}...`);
                    await this.customSwipe(direction, intensity, startX, startY);
                }
            } catch (error) {
                console.log(`Attempt ${retries + 1} of ${maxRetries}: Element not found, scrolling ${direction}...`);
                await this.customSwipe(direction, intensity, startX, startY);
            }
            retries++;
            await browser.pause(1000);
        }

        throw new Error(`The element with the locator '${locator}' was not found after ${maxRetries} scroll attempts.`);
    }

    /**
     * Custom swipe action based on direction and intensity.
     * 
     * @param {string} direction - The swipe direction.
     * @param {number} intensity - The swipe intensity.
     * @param {number} startX - Starting X position (percentage).
     * @param {number} startY - Starting Y position (percentage).
     */
    async customSwipe(direction: string, intensity: number, startX: number, startY: number) {
        let start = { x: startX, y: startY };
        let end = { x: startX, y: startY };

        switch (direction) {
            case 'up':
                end.y = Math.max(start.y - intensity, 0);
                break;
            case 'down':
                end.y = Math.min(start.y + intensity, 100);
                break;
            case 'left':
                end.x = Math.max(start.x - intensity, 0);
                break;
            case 'right':
                end.x = Math.min(start.x + intensity, 100);
                break;
        }
        await Gestures.swipeOnPercentage(start, end, 100);
    }
}