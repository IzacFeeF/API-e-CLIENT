'use strict'
const mongoose = require('mongoose') //Importar o mongoose

class Client{ 
    constructor(){
        mongoose.model('Client', { //Criar um modelo do mongoose chamado Client
            nome: String,
            cpf: String,
            senha: String
        })
    }
}

module.exports = Client; //Exportar a classe co mseu constructor