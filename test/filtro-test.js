
const filtro = require("../src/filtro.js");

describe("Pruebas para comprobar el color de acuerdo al arreglo", function() {
  
    it("red test", function() {
      
      filtrored = [255,0,0];
      
      expect(filtro.recibeColor("red")).toEqual(filtrored);
      
    });
    
    it("green test", function() {
      
      filtrogreen = [0,255,0];
      
      expect(filtro.recibeColor("green")).toEqual(filtrogreen);
      
    });
    
    it("blue test", function() {
      
      filtroblue = [0,0,255];
      
      expect(filtro.recibeColor("blue")).toEqual(filtroblue);
      
    });
  
});

