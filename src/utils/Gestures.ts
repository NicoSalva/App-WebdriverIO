import { RectReturn } from '@wdio/protocols/build/types';

interface XY {
    x: number;
    y: number;
}

interface SwipeDirection {
    start: XY;
    end: XY;
}


let SCREEN_SIZE: RectReturn;

const SWIPE_DIRECTION = {
    down: {
        start: { x: 50, y: 50 },
        end: { x: 50, y: 85 },
    }, left: {
        start: { x: 95, y: 50 },
        end: { x: 5, y: 50 },
    },
    right: {
        start: { x: 5, y: 50 },
        end: { x: 95, y: 50 },
    },
    up: {
        start: { x: 50, y: 75 },
        end: { x: 50, y: 0 },
    },
};

class Gestures {
    static async checkIfDisplayedWithSwipeUp(element: WebdriverIO.Element, maxScrolls: number, amount = 0) {
        if (!await element.isDisplayed() && amount <= maxScrolls) {
            await this.swipeUp(100);
            await this.checkIfDisplayedWithSwipeUp(element, maxScrolls, amount + 1);
        } else if (amount > maxScrolls) {
            throw new Error(`The element '${element}' could not be found or is not visible.`);
        }
    }

    static async swipeDown(percentage = 1) {
        await this.swipeOnPercentage(SWIPE_DIRECTION.down.start, SWIPE_DIRECTION.down.end, percentage);
    }

    static async swipeUp(percentage = 1) {
        await this.swipeOnPercentage(SWIPE_DIRECTION.up.start, SWIPE_DIRECTION.up.end, percentage);
    }

    static async swipeLeft(percentage = 1) {
        await this.swipeOnPercentage(SWIPE_DIRECTION.left.start, SWIPE_DIRECTION.left.end, percentage);
    }

    static async swipeRight(percentage = 1) {
        await this.swipeOnPercentage(SWIPE_DIRECTION.right.start, SWIPE_DIRECTION.right.end, percentage);
    }

    static async swipeOnPercentage(start: XY, end: XY, percentage: number) {
        SCREEN_SIZE = SCREEN_SIZE || await driver.getWindowRect();
        let pressOptions = this.getDeviceScreenCoordinates(SCREEN_SIZE, start);
        let moveToScreenCoordinates = this.getDeviceScreenCoordinates(SCREEN_SIZE, end);
    
        // Ajustar moveToScreenCoordinates basado en el porcentaje
        moveToScreenCoordinates.y += (moveToScreenCoordinates.y - pressOptions.y) * (percentage / 100 - 1);
        moveToScreenCoordinates.x += (moveToScreenCoordinates.x - pressOptions.x) * (percentage / 100 - 1);
    
        await this.swipe(pressOptions, moveToScreenCoordinates);
    }
    
    static async swipe(from: XY, to: XY) {
        // Calcula una distancia mayor para el deslizamiento
        const adjustedTo = {
            x: to.x,
            y: from.y + (to.y - from.y) * 2 // Ajusta este multiplicador según sea necesario
        };
    
        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: from.x, y: from.y },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 }, // Breve pausa antes de iniciar el swipe
                    { type: 'pointerMove', duration: 100, x: adjustedTo.x, y: adjustedTo.y }, // Más rápido
                    { type: 'pointerUp', button: 0 }
                ],
            }
        ]);
        await driver.pause(500); // Una pausa corta después del swipe
    }
    
    

    private static getDeviceScreenCoordinates(screenSize: RectReturn, coordinates: XY): XY {
        return {
            x: Math.round(screenSize.width * (coordinates.x / 100)),
            y: Math.round(screenSize.height * (coordinates.y / 100)),
        };
    }
}

export default Gestures;