
//Importar las funciones para pruebas.
const filtro = require("../src/filtro.js");

/**
 *Pruebas unitarias para los colores de los filtros.
 *@param {String} red green blue
 *@returns {Array} El arreglo con los pixeles del color requerido.
 */
describe("Pruebas para comprobar el color de acuerdo al arreglo", function() {
  
    /**
     * Prueba para el filtro rojo
     */
    it("red test", function() {
      filtrored = [1,0,0];
      expect(filtro.recibeColor("red")).toEqual(filtrored);
    });
    
    /*
     *Prueba para el filtro verde
     */
    it("green test", function() {
      filtrogreen = [0,1,0];
      expect(filtro.recibeColor("green")).toEqual(filtrogreen);
    });
    
    /*
     *Prueba para el filtro azul
     */
    it("blue test", function() {
      filtroblue = [0,0,1];
      expect(filtro.recibeColor("blue")).toEqual(filtroblue);
    });
    
});

