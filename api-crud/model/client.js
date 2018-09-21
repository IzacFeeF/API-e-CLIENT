'use strict'
const mongoose = require('mongoose')

class Client{
    constructor(){
        mongoose.model('Client', {
            nome: String,
            cpf: String,
            senha: String
        })
    }
}

module.exports = Client;