const express = require('express');
const app = express();
const path = require('path');
const { Sequelize } = require('sequelize/dist');

const mysql = require('mysql2');

const bodyParser = require('body-parser');
const usuarios = require('./models/users')
const db = require('./models/db');

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

/*var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'carlos123',
    database: 'usuarios'
});

connection.connect(function (err){
    if (err){
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
})*/

/*connection.query('SELECT * FROM users',function(err,rows,fields){
    if (!err){
        console.log('Resultado: ', rows);
    }else{
        console.log('Erro ao realizar a consulta.');
    }
})*/



app.use(express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname,"img")));

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/Cast4All/welcome.html")
});

app.get("/login", function(req,res){
    res.sendFile(__dirname+"/Cast4All/login.html")
})

app.get("/cadastrar", function(req,res){
    res.sendFile(__dirname+"/Cast4All/CadastroIndex.html")
})

app.get("/password", function(req,res){
    res.sendFile(__dirname+"/Cast4All/RecuperarSenhaIndex.html")
})

app.post('/register', function(req,res){
    //res.send("Nome: " + req.body.nome)
    usuarios.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        nascimento: req.body.data
    }).then(function(){
        res.sendFile(__dirname+"/Cast4All/login.html")
    }).catch(function(erro){
        res.sendFile(__dirname+"/Cast4All/CadastroIndex.html")
    })
})



app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
})