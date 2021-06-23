const express = require("express")
const app = express();
const connection = require("./database/database")

//Database

connection.authenticate().then(()=>{
    console.log("Conexao realizada com sucesso")
}).catch((err)=>{
    console.log("Erro ao se conectar com o banco de dados" + err)
})


//Estou dizendo para o express usar o ejs como View Engine

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get("/",(req, res)=>{
 

    res.render("index")
});

app.get("/perguntar", (req, res)=>{
    res.render("perguntar")
})

app.post("/salvarpergunta", (req, res)=>{

    let titulo = req.body.titulo
    let descricao = req.body.descricao

    res.send("Formulário recebido! Titulo:" +titulo+ " <br> " + "Descrição: " +descricao)
})

app.listen(8080,()=>{
    console.log("Servidor rodando!");
});