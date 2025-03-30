/**
 * Formatea una fecha en formato legible en español
 * @param {string} fechaStr - Fecha en formato string
 * @returns {string} - Fecha formateada
 */
export function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit' 
    });
  }
  
  /**
   * Obtiene la fecha actual en formato YYYY-MM-DD
   * @returns {string} - Fecha actual en formato YYYY-MM-DD
   */
  export function obtenerFechaActual() {
    return new Date().toISOString().split('T')[0];
  }
  
  /**
   * Obtiene una fecha anterior a la actual en formato YYYY-MM-DD
   * @param {number} dias - Número de días a restar
   * @returns {string} - Fecha anterior en formato YYYY-MM-DD
   */
  export function obtenerFechaAnterior(dias) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - dias);
    return fecha.toISOString().split('T')[0];
  }
  
  /**
   * Valida si una fecha está en el formato correcto YYYY-MM-DD
   * @param {string} fecha - Fecha a validar
   * @returns {boolean} - true si la fecha es válida, false en caso contrario
   */
  export function validarFormatoFecha(fecha) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(fecha);
  }