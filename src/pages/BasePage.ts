import { WaitForOptions } from "webdriverio";
import Gestures from "../utils/Gestures";

export default class BasePage {

    /**
     * Realiza un tap (clic) en un elemento especificado por su localizador.
     *
     * @param {WebdriverIO.Element} element - El elemento.
     */
    async tap(element: WebdriverIO.Element) {
        try {
            await element.click();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Escribe texto en un campo de formulario identificado por su localizador.
     *
     * @param {WebdriverIO.Element} element - El elemento.
     * @param {string | number} text - El texto a escribir en el campo de formulario.
     */
    async type(element: WebdriverIO.Element, text: string | number) {
        try {
            await element.setValue(text);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Obtiene el texto mostrado de un elemento especificado por su localizador.
     *
     * @param {WebdriverIO.Element} element - El elemento.
     * @returns {Promise<string>} El texto del elemento.
     */
    async getText(element: WebdriverIO.Element): Promise<string> {
        try {
            return await element.getText();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Recupera dinámicamente el texto de un elemento especificado por su localizador, con reintentos.
     *
     * @param {WebdriverIO.Element} element - El elemento.
     * @param {number} maxRetries - Número máximo de intentos para recuperar el texto.
     * @returns {Promise<string>} El texto recuperado del elemento.
     * @throws {Error} Error si el texto no puede ser recuperado tras el número máximo de intentos.
     */
    async dynamicGetText(element: WebdriverIO.Element, maxRetries: number = 3): Promise<string> {
        let retries = 0;
        while (retries < maxRetries) {
            try {
                return await element.getText();
            } catch (error) {
                if (retries === maxRetries - 1) {
                    console.error(`Error al recuperar texto para elemento después de ${maxRetries} intentos:`, error);
                    throw new Error(`No se pudo recuperar el texto para el elemento`);
                }
                await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 1 segundo antes del siguiente intento
                retries++;
            }
        }
        throw new Error("El texto no pudo ser recuperado después del número máximo de intentos.");
    }

    /**
 * Obtiene un elemento mobile a partir de un localizador.
 * 
 * @param {string} locator - El localizador del elemento.
 * @param {number} [time=5] - El tiempo de espera en segundos. Por defecto, 5 segundos.
 * @returns {Promise<WebdriverIO.Element>} Una promesa que resuelve en el elemento.
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
 * Espera a que un elemento esté visible basado en su localizador y luego lo retorna.
 * Itera la operación hasta un máximo de intentos definidos o 5 por defecto.
 * 
 * @param {string} locator - El localizador del elemento.
 * @param {number} [maxRetries=5] - Número máximo de intentos, por defecto es 5.
 * @param {number} [waitTime=5000] - Tiempo de espera en milisegundos para cada intento, por defecto 5000 ms.
 * @returns {Promise<WebdriverIO.Element>} Promesa que resuelve en el elemento una vez que está visible.
 * @throws {Error} Si el elemento no está visible después de los intentos máximos.
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
     * Espera a que un elemento aparezca en pantalla.
     * 
     * @param {WebdriverIO.Element} element - El elemento a esperar.
     * @returns {Promise<boolean>} true si se encuentra. false si no se encuentra.
     */
    async waitForElementDisplayed(element: WebdriverIO.Element): Promise<boolean> {
        return await element.waitForDisplayed({ timeout: 6000 });
    }

    /**
     * Espera a que un elemento exista.
     * 
     * @param {WebdriverIO.Element} element - El elemento a esperar.
     * @returns {Promise<boolean>} true si existe. false si no existe.
     */
    async waitForElementExist(element: WebdriverIO.Element): Promise<boolean> {
        return await element.waitForExist({ timeout: 9000 });
    }

    async scrollToElement(locator: string, direction: string, intensity = 20, startX: number = 50, startY: number = 50): Promise<WebdriverIO.Element> {
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

        console.log(`Desplazando desde ${JSON.stringify(start)} a ${JSON.stringify(end)}`);
        await Gestures.swipeOnPercentage(start, end, 100); 
    }


}