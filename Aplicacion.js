const prompt = require('prompt-sync')({ sigint: true });
const ArrayList = require('./ArrayList');
const Tarea = require('./tarea');
let listaTareas = new ArrayList.ArrayList();

function Aplicacion() {

    let opcion = null;
    let nom, estado, deescripcion, dificultad;
    let x, k, l; // Definiendo las variables que se usan en el código

    // iniciar programa
    this.iniciarApp = function () {
        do {
            console.clear();
            console.log(`   
                                  ╔═══════════════════════════════════╗
                                  ║      [1] Ver mis tareas           ║
                                  ║      [2] Buscar mis tareas        ║
                                  ║      [3] Agregar una tarea        ║​
                                  ║      [0] Salir                    ║​
                                  ╚═══════════════════════════════════╝ `);
            x = prompt("Indique la opcion: ");
            opcion = parseInt(x);

            switch (opcion) {
                case 1:
                    this.caso1();
                    break;
                case 2:
                    if (listaTareas.cantidad === 0) {
                        console.log("No hay tareas cargadas");
                        prompt("");
                    } else {
                        listaTareas.buscar();
                        prompt("");
                    }
                    break;
                case 3:
                    this.caso3();
                    break;
                case 0:
                    console.log(`Hasta la próxima...`);
                    break;
                default:
                    console.log(`-OPCION NO VALIDA-`);
                    prompt("");
                    break;
            }
        } while (opcion !== 0);
    }

    this.caso1 = function () {
        console.clear();
        if (listaTareas.cantidad === 0) {
            console.log("No hay tareas cargadas");
            prompt("");
        } else {
            console.log(`¿Qué tareas deseas ver? 
            ╔═══════════════════════════════════╗
            ║      [1] Todas                    ║
            ║      [2] Pendientes               ║
            ║      [3] En curso                 ║​
            ║      [4] Terminadas               ║​
            ║​      [0] Salir                    ║​
            ╚═══════════════════════════════════╝ `);
            x = prompt("Indique la opcion: ");
            let k = parseInt(x);

            this.verTareaFiltro(k);
        }
    }

    this.caso3 = function () {
        nom = prompt("Ingrese el título de la tarea (al menos 4 caracteres):");
        while (nom.length < 4) {
            console.log("Título inválido o vacío, inténtelo de nuevo");
            nom = prompt("Ingrese el título de la tarea (al menos 4 caracteres):");
        }

        deescripcion = prompt("Ingrese la descripción de la tarea: ");
        if (deescripcion === "") {
            deescripcion = "Sin descripción";
        }

        console.log(`--------------------------------------------------------------`);
        x = prompt("Elija el estado de la tarea -[1] Pendiente, [2] En curso, [3] Terminada- : ");
        estado = this.obtenerEstadoTarea(x);

        console.log(`--------------------------------------------------------------`);
        x = prompt("Elija la dificultad de la tarea -[1] Fácil, [2] Medio, [3] Difícil- : ");
        dificultad = this.obtenerDificultad(x);

        console.log(`--------------------------------------------------------------`);
        let fechaVen = new Date(prompt("¿Cuándo vence? (formato: aaaa/mm/dd): "));
        if (isNaN(fechaVen)) {
            fechaVen = "Sin datos";
        } else {
            fechaVen = this.formatearFecha(fechaVen);
        }

        let fechaActual = new Date();
        let tarea = new Tarea.Tarea(nom, deescripcion, estado, dificultad, this.formatearFecha(fechaActual), fechaVen, this.formatearFecha(fechaActual), listaTareas.cantidad + 1);
        listaTareas.agregar(tarea);
    }

    this.formatearFecha = function (fecha) {
        let año = fecha.getFullYear();
        let mes = fecha.getMonth() + 1;
        let dia = fecha.getDate();

        return `${dia}/${mes}/${año}`;
    }

    this.obtenerEstadoTarea = function (valor) {
        switch (parseInt(valor)) {
            case 1:
                return "Pendiente";
            case 2:
                return "En curso";
            case 3:
                return "Terminada";
            default:
                return "Pendiente";
        }
    }

    this.obtenerDificultad = function (valor) {
        switch (parseInt(valor)) {
            case 1:
                return "Fácil";
            case 2:
                return "Medio";
            case 3:
                return "Difícil";
            default:
                return "Fácil";
        }
    }

    this.verTareaFiltro = function (k) {
        console.clear();
        switch (k) {
            case 1:
                console.log("Lista de tareas: ");
                for (let i = 0; i < listaTareas.cantidad; i++) {
                    let tarea = listaTareas.imprimirPorCampo(i, "nombre");
                    console.log(`Tarea N[${i + 1}]: ${tarea}`);
                }
                console.log("---------------------------------");
                x = prompt("Si quieres ver el detalle de alguna tarea, introduce su número: ");
                this.imprimir(x);
                break;
            case 2:
                if (listaTareas.imprimirPorCampo('Pendiente')) {
                    console.log("---------------------------------");
                    x = prompt("Si quieres ver el detalle de alguna tarea, introduce su número: ");
                    this.imprimir(x);
                }
                break;
            case 3:
                if (listaTareas.imprimirPorCampo('En curso')) {
                    console.log("---------------------------------");
                    x = prompt("Si quieres ver el detalle de alguna tarea, introduce su número: ");
                    this.imprimir(x);
                }
                break;
            case 4:
                if (listaTareas.imprimirPorCampo('Terminada')) {
                    console.log("---------------------------------");
                    x = prompt("Si quieres ver el detalle de alguna tarea, introduce su número: ");
                    this.imprimir(x);
                }
                break;
        }
    }

    this.imprimir = function (x) {
        listaTareas.imprimir(x - 1);
        console.log("Si deseas editarlo presiona 1 o 0 para salir");
        let z = prompt("Indica la opción: ");
        if (parseInt(z) === 1) {
            this.modificar(x);
        } else {
            prompt("Presiona enter para continuar");
        }
    }

    this.modificar = function (x) {
        console.clear();
        console.log(`Estas editando la tarea: ${listaTareas.imprimirPorCampo(x - 1, "nombre")}`);
        console.log("-Si deseas mantener los valores de un atributo, simplemente déjalo en blanco");
        console.log("-Si deseas dejar en blanco un atributo, escribe 'd'");

        let valor = prompt("1. Descripción: ");
        this.cambiarValor(x, "descripcion", valor);

        valor = prompt("2. Estado -[1] Pendiente, [2] En curso, [3] Terminada, [4] Cancelada- : ");
        valor = this.obtenerEstadoTarea(valor);
        this.cambiarValor(x, "estado", valor);

        valor = prompt("3. Dificultad -[1] Fácil, [2] Medio, [3] Difícil- : ");
        valor = this.obtenerDificultad(valor);
        this.cambiarValor(x, "dificultad", valor);

        let fechaVen = new Date(prompt("4. Vencimiento (formato: aaaa/mm/dd): "));
        if (isNaN(fechaVen)) {
            this.cambiarValor(x, "fVenc", "Sin Datos");
        } else {
            this.cambiarValor(x, "fVenc", this.formatearFecha(fechaVen));
        }

        let fechaActual = new Date();
        this.cambiarValor(x, "fUltVenc", this.formatearFecha(fechaActual));
    }

    this.cambiarValor = function (x, atributo, valor) {
        if (valor === "d") {
            listaTareas.modificar(x - 1, atributo, " ");
        } else if (valor !== "") {
            listaTareas.modificar(x - 1, atributo, valor);
        }
    }
}

module.exports = { Aplicacion };
