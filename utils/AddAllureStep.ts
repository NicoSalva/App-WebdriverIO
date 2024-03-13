import allureReporter from "@wdio/allure-reporter"

/**
 * @function allureLogger - Función para mostrar la información que consideremos relevante en
 * los steps del reporte de Allure.
 * Tener en considereación esta función para reemplazar los console.log
 ** @param {string} message Texto del mensajes que se va a visualizar en el reporte de Allure
 ** @param {any} value Opcional - Valor deseamos visualizar en el reporte de Allure
 */
export const allureLogger = (message: string, value?: any) => {
  try {
    //Detalle por defecto de la validación
    if (value == 'undefined' || !value) {
      allureReporter.step(`${message}`, function () { })
    } else {
      allureReporter.step(`${message} ▶️ ${value}`, function () { })
    }
  } catch (error) {
    console.log(`No se indicó correctamente el mensaje`);
  }
}
