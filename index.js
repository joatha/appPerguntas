const express = require("express")
const app = express();
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")

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
 
    Pergunta.findAll({raw:true, order:[
        ['id' ,'DESC']
    ]}).then((perguntas)=>{
        res.render("index", {
            perguntas: perguntas
        })
    })
  
});

app.get("/perguntar", (req, res)=>{
    res.render("perguntar")
})

app.post("/salvarpergunta", (req, res)=>{

    let titulo = req.body.titulo
    let descricao = req.body.descricao

    Pergunta.create({
        titulo:titulo,
        descricao:descricao
    }).then(()=>{
        res.redirect("/")
    }).catch((err)=>{
        console.log("Erro ao salvar" +err)
    })
})

app.get("/pergunta/:id", (req, res)=>{

    let id = req.params.id
    Pergunta.findOne({
        where: {id:id}
        }).then(pergunta=>{

        if(pergunta != undefined){

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id', 'DESC']]

            }).then((respostas)=>{
                res.render("pergunta",{
                    pergunta:pergunta,
                    respostas: respostas
                })
            })

           
        }else{
            res.redirect("/")

        }
    })
})

app.post("/responder", (req, res)=>{
    let corpo = req.body.corpo
    let perguntaId = req.body.pergunta

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId)
    })

})

app.listen(8080,()=>{
    console.log("Servidor rodando!");
});