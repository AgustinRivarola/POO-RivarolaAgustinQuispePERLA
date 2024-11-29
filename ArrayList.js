const promp = require('prompt-sync')({ sigint: true });
const Tarea = require('./tarea');

function ArrayList() {
    let array = [];
    this.cantidad = 0;

    // Agregar tarea al array
    this.agregar = function (obj) {
        array.push(obj);
        this.cantidad = this.cantidad + 1;
    }

    // Modificar atributo de una tarea
    this.modificar = function (index, nombreP, nuevoValor) {
        if (index >= 0 && index < array.length) {
            if (array[index].hasOwnProperty(nombreP)) {
                array[index][nombreP] = nuevoValor;
                console.log(`Atributo "${nombreP}" modificado en el objeto ${index + 1}.`);
            } else {
                console.log(`El Objeto ${index + 1} no tiene ningun atributo "${nombreP}".`);
            }
        } else {
            console.log('Índice fuera de rango');
        }
    }

    // Imprimir tarea por índice
    this.imprimir = function (index) {
        if (index >= 0 && index < array.length) {
            return array[index].imprimirValores();
        } else {
            return null;
        }
    }

    // Buscar tareas por nombre
    this.buscar = function () {
        let nombres = [];
        for (let i = 0; i < array.length; i++) { 
            nombres.push(array[i].nombre);
        }

        let coincidencias = [];

        console.log("Introduce el título de una tarea para buscarla:");
        const input = promp("> ").toLowerCase(); 

        coincidencias = nombres
            .map((nombre, index) => ({ nombre, indice: index }))
            .filter(item => item.nombre.toLowerCase().includes(input))
            .map(item => item.indice + 1);

        if (coincidencias.length > 0) {
            console.log("Estas son las tareas relacionadas:");
            console.log();
            coincidencias.forEach(indice => console.log(` [${indice}] ${nombres[indice - 1]}`));
            return coincidencias;
        } else {
            console.log("No hay tareas relacionadas con la búsqueda");
            return 0;
        }
    }

    // Imprimir tarea por campo específico
    this.imprimirporCampo = function (indice, campo) {
        return array[indice][campo];
    }

    // Imprimir tareas filtradas por estado
    this.imprimirPorCampo = function (estadoBuscado) {
        console.log(`Tareas con el estado buscado "${estadoBuscado}":`);

        const tareasEncontradas = array
            .map((tarea, indice) => ({ indiceOriginal: indice, tarea }))
            .filter(item => item.tarea.estado === estadoBuscado);

        if (tareasEncontradas.length > 0) {
            tareasEncontradas.forEach(item => {
                console.log(`Tarea [${item.indiceOriginal + 1}]: ${item.tarea.nombre}`);
            });
            return 1;
        } else {
            console.log(`No se encontraron tareas con ese estado.`);
            return 0;
        }
    };
}

module.exports = { ArrayList };
