//Rivarola Agustin
prompt = require('prompt-sync')({sigint: true});
const App = require('./Aplicacion');
let app = new App.Aplicacion();
app.iniciarApp();