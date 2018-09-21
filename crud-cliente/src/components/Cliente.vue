<template>
    <v-container grid-list-xs>
        <v-card>
            <v-card-title background-color="teal" primary-title>
                Cadastro de Cliente
                <v-spacer></v-spacer>
                <v-icon color="grey darken-3">face</v-icon>
            </v-card-title>
                <v-form>
                    <v-card-text>
                        <v-text-field
                            name="nome"
                            label="Nome"
                            id="nome"
                            v-model="cliente.nome"
                            required
                        ></v-text-field>
                        <v-text-field
                            name="senha"
                            label="Senha"
                            id="senha"
                            v-model="cliente.senha"
                            required
                        ></v-text-field>
                        <v-text-field
                            name="cpf"
                            label="CPF"
                            id="cpf"
                            v-model="cliente.cpf"
                            required
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="teal" class="white--text"
                        @click="save"
                        :loading="saving"
                        :disabled="saving"
                        >
                        Salvar</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="red" class="white--text"
                        @click="clean"
                        flat
                        >
                        Cancelar</v-btn>
                    </v-card-actions>
            </v-form>
        </v-card>
        <v-container ma-4>
            <v-card color="teal" class="white--text">
                <v-card-title primary-title>
                    Clientes Cadastrados
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="clientes"
                    hide-actions
                    class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                        <td>Nome: {{ props.item.nome }}</td>
                        <td>Senha: {{ props.item.senha }}</td>
                        <td>CPF: {{ props.item.cpf }}</td>
                        <v-btn @click="edit( props.item )" color="teal darken-3" flat small icon><v-icon>edit</v-icon></v-btn>
                        <v-btn @click="remove( props.item )" color="pink darken-3" flat small icon><v-icon>delete</v-icon></v-btn>
                    </template>
                </v-data-table>
            </v-card>
            <v-snackbar
                v-model="snackbar.show"
                color="grey darken-3"
                :bottom="true"
                :left="true"
                :multi-line="true"
                :right="true"
                :timeout="3000"
                :top="true"
                :vertical="false"
            >
            {{ snackbar.text }}
            <v-btn
                color="red"
                flat
                @click.native="snackbar.show = false"
            >
                Fechar
            </v-btn>
            </v-snackbar>
        </v-container>
    </v-container>
</template>

<script>
import axios from 'axios' //Importar o axios
export default {
    data () { //Retornar a data para o App a usar
        return {
            snackbar: {show: false, text: ""},
            saving: false, //Colocar o botão salvar com o estado de "loading"
            cliente: {},
            headers: [
                { text: 'Nome', align: 'left', sortable: true, value: 'nome' },
                { text: 'Senha', value: 'senha' },
                { text: 'CPF', value: 'cpf' },
                { text: 'Ações', sortable: false}
            ],
            clientes: [],
        }
    },
    methods: {
        showSnackbar(text){ //Se for fornecido pegar o text enviado
            this.snackbar.text = text; //Colocar o text na snackbar
            this.snackbar.show = true; //Mostrar a snackbar
        },
        async findAll(){
            try { //Tentar rodar esse código
                let resp = await axios.get("http://localhost:3000/clients");
                this.clientes = resp.data;
            } catch (error) { //Se acontecer algum erro rodar essa parte da função
                alert("Falha ao carregar os Clientes.");
                console.log("Erro ao carregar os Clientes" + error);
            };
        },
        async save(){
            this.saving = true; //Colocar salvar para true
            try {
                if(this.cliente.nome != "" && this.cliente.senha != "" && this.cliente.cpf != ""){
                    if(this.cliente._id){
                        let resp = await axios.put("http://localhost:3000/clients", this.cliente); 
                    }else{
                        let resp = await axios.post("http://localhost:3000/clients", this.cliente);
                    }
                    this.showSnackbar("SUCESSO!");
                    this.findAll();
                    this.clean();   
                }
            } catch (error) {
                alert("Falha ao salvar Cliente.");
                console.log("Erro ao salvar Cliente: " + error);
            } finally {
                this.saving = false;
            };
        },
        async edit(cliente){
            try {
                this.cliente = cliente;
            } catch (error) {
                alert("Falha ao inicializar edição do Cliente!");
                console.log("Erro ao inicializar edição de Cliente: " + error);
            }
        },
        async remove(_id){
            try {
                if(confirm("Deseja realmente remover esse Cliente?")){
                    await axios.delete("http://localhost:3000/clients", {data : {_id: _id}}); //Precisa ser passado em data o payload do axios.delete()
                    this.findAll();
                }
            } catch (error) {
                alert("Falha ao remover Cliente!");
                console.log("Erro ao remover Cliente: " + error);
            }
        },
        clean(){ //Limpar o cliente{} e as inputs ligadas para ele com o :model
            this.cliente = {}
        }
    },
    mounted(){
        this.findAll();
    }
}
</script>