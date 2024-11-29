prompt = require('prompt-sync')({sigint: true});

function Tarea(nombre, descripcion, estado, dificultad, fCreacion, fVenc, fUltVenc, nro ){
  this.nombre = nombre;
  this.descripcion = descripcion;
  this.estado = estado;
  this.dificultad = dificultad;
  this.fCreacion = fCreacion;
  this.fVenc = fVenc;
  this.fUltVenc = fUltVenc;
  this.nro = nro;
  
this.imprimirValores = function() {
      console.log(`╔══════════════════════════════════════`);
      console.log(`║Tarea n[${this.nro}]:  ${this.nombre} `);
      console.log(`╠══════════════════════════════════════`);
      console.log(`║Descipcion:  ${this.descripcion}`);
      console.log(`║Estado:      ${this.estado}`);
      console.log(`║Dificultad:  ${this.dificultad}`);
      console.log(`║Fcreacion:   ${this.fCreacion}`);
      console.log(`║FVenc:       ${this.fVenc}`);
      console.log(`║FUltVenc:    ${this.fUltVenc}`);
      console.log(`╚══════════════════════════════════════`);
    };
}

module.exports = {Tarea};