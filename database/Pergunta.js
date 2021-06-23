const Sequelize = require('sequelize')
const connection = require('./database')

const Pergunta = connection.define('pergunta',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }

})
module.exports = Pergunta;

/*
Pergunta.sync({force: false}).then(()=>{
    console.log("Tabela criada com sucesso!")
}).catch((err)=>{
    console.log("Erro ao criar tabela" +err)
})*/

