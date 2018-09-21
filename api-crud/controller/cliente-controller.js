'use strict'

const mongoose = require('mongoose');
var model;

//export default class ClientController{...}

class ClientController{ //Classe Controller dos clientes
    constructor (app){ //Precisa do app já que não possui o this.app definido

        //O método send() é usado para texto
        //Para manter um padrão, na hora de mandar objetos usamos json()
        app.get('/clients', this.findAll); //Sintáxe reduzida
        /*(req, res) => {

            res.json(this.clientController.findAll()); //Chamar a função da classe ClientController
            }
            Sintáxe maior
        */
        /*
            Antes de usar req e res
            findAll(){
                return [blablabla]
            }
        */

        app.post('/clients', this.create);
        app.put('/clients', this.refresh);
        app.delete('/clients', this.remove);
        model = mongoose.model('Client');
    }

    //ASYNC
    async findAll (req, res){  //Metodo que retorna os clientes
        res.json(await model.find()); //Retorna os objetos que mongoose achar feitos no modelo do Client
    };

    async create (req, res){
        let client = req.body; //Pegar o corpo da requisição ou seja {"nome":"balbla",etc...}
        res.json(await model.create(client)) //Criar o cliente
    };

    async refresh (req, res){
        let client = req.body;
        res.json(await model.update({_id: client._id}, client)); //Para comparar usa-se {comparador, sujeito da comparação}
    };

    async remove(req, res){ //Método para remover clientes recebendo o id do objeto no req
        let id = req.body._id; //Guardar o id do req em uma var
        res.json(await model.remove({_id: id})); //Remover
    }

}
//Exportar a Classe para ela ser importada em outros arquivos
module.exports = ClientController;