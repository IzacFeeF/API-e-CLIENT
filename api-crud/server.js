'use strict';

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const Express = require('express'); //importações no node são feitas com require
//^ a const acima foi chamada para express não se associada a uma variável/modificada Ex: 
/*
var Express = require('express')
Express = "hackeado kkkkk"
*/

const Client = require('./model/client')
const ClientController = require('./controller/cliente-controller'); //Importar a Classe ClientController

class Server {

    constructor() {
        //Instanciar o Express
        this.app = new Express();

        this.app.use(bodyParser.json())

        this.app.use(function (req, res, next) { //Permissões para o cors permitir as requests
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
            next();
        });

        mongoose.connect('mongodb://<dbuser>:<dbpass>@ds261302.mlab.com:61302/crud-api', { useNewUrlParser: true }).then(console.log("Conectado a DB!"));
        //Toda vez que uma requisição for feita na url / retornara a res
        //req = requisition //res = response
        this.app.get('/', (req, res) => {

            res.send("Olá mundo");

        });
        //Forma alternativa , ambas são formas de chamar funções anonimas
        /*
        this.app.get('/', function(req, res){

            res.send("Olá mundo")

        });
        */

        new Client()

        //Instanciar o ClientController
        this.clientController = new ClientController(this.app); //Enviar o this.app desse constructor para o ClientController

        //O servidor rodara na porta 3000
        this.app.listen(3000);
    };
};
new Server();