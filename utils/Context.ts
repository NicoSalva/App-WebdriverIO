export class Context {

    static context: { [index: string]: any } = {}

    static setVariableContext(variableName: string, value: any) {
        this.context[variableName] = value;
    }

    static getVariableContext(variableName: string): any {
        if (this.context[variableName] !== undefined) {
            return this.context[variableName];
        } else {
            throw new Error(`No existe la variable ${variableName}`);
        }
    }

    static resetVariableContext(): void {
        this.context = {};
    }

    static variableExist(variableName: string): boolean {
        if (this.context[variableName] !== undefined) {
            return true;
        } else {
            return false;
        }
    }

}