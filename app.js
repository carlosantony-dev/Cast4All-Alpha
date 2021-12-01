const express = require('express');
const app = express();
const path = require('path');
const { Sequelize } = require('sequelize/dist');

const mysql = require('mysql2');

const bodyParser = require('body-parser');
const Usuarios = require('./models/users')
const db = require('./models/db');
const { sequelize } = require('./models/db');
const { send } = require('process');

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
app.use(express.static(path.join(__dirname,"scripts")));
app.use(express.static(path.join(__dirname,"img")));
app.use(express.static(path.join(__dirname,"audios")));

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

app.get("/logado", function(req,res){
    res.sendFile(__dirname+"/Cast4All/home_logado.html")
})

app.get("/perfil_logado", function(req,res){
    res.sendFile(__dirname+"/Cast4All/perfil.html")
})

//ENVIO DE EMAILS

const nodemailer = require('nodemailer');
const { type } = require('os');

let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: "cast4allbr@outlook.com",
        pass: "cast4all123"
    }
});



app.post("/send-email", function(req,res){
    const user = req.body.email
        Usuarios.findOne({
            attributes: ['senha'],
            where: {email: user},
          })
          .then(function(usuarios) {
            senha = usuarios
            senhaT = senha['senha']
            transporter.sendMail({
                from: "Cast 4All <cast4allbr@outlook.com>",
                to: user,
                subject: "Olá, sua recuperação de senha do Cast4All chegou!",
                text: "Se você digitou um email que naõ está cadastrado, sua senha a seguir será nula!, Senha cadastrada: " + senhaT
            }).then(message => {
                console.log(message);
            }).catch(err => {
                console.log(err);
            })
            res.sendFile(__dirname+"/Cast4All/login.html")
          }).catch(err =>{
            res.sendFile(__dirname+"/Cast4All/RecuperarSenhaIndex.html")
          })

    /*transporter.sendMail({
        from: "Cast 4All <cast4allbr@outlook.com>",
        to: user,
        subject: "Olá, sua recuperação de senha do Cast4All chegou!",
        text: "Se você digitou um email que naõ está cadastrado, sua senha a seguir será nula!, Senha cadastrada: "
    }).then(message => {
        console.log(message);
    }).catch(err => {
        console.log(err);
    })*/
});

app.post("/auth", function(req,res){
    const user = req.body.email
    const password = req.body.senha
   Usuarios.findAll({where: {email: user, senha: password}}).then(function(usuarios){
       if (usuarios == ''){
        res.sendFile(__dirname+"/Cast4All/login.html")
       }else{
        res.sendFile(__dirname+"/Cast4All/home_logado.html")
       }
   })
})



app.post('/register', function(req,res){
    Usuarios.create({
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

/*app.post('/auth', function(req,res){
    const user = req.body.email
   /*Usuarios.findAll({where: {email: user}}).then(function(usuarios){
       res.send({Usuarios: usuarios})
   })
   res.send(user);
})*/



app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
})