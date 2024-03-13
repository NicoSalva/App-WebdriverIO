export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function getRandomNumber(min, max): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getIsoTimestamp(): string {
    return new Date().toISOString();
}

export function getLocalDate(): string {
    return new Date().toLocaleDateString(undefined, {year: "numeric", month: "2-digit", day:"2-digit"});
}

export function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

export function getRandomAmount(amount: number): number {
    const presemilla: number = 781;
    const semilla = Math.random()*presemilla;
    const monto:number = parseInt(amount.toFixed(2));    
    return monto + semilla;
}

export function getOneYearLaterDateTime(currentDate: Date): string {
    const oneYearLater = new Date(currentDate);
    oneYearLater.setFullYear(currentDate.getFullYear() + 1);
    return oneYearLater.toISOString();
}

export function generateShortId(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
}

export function getDateInAnotherformat(): string {
    // obtiene la fecha con el formato "año-mes-dia"
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); 
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}