//CARLOS ANTONY BLECHA PIRES RA: 20630414

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
const { stat } = require('fs');
const { start } = require('repl');

let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: "cast4allbr@outlook.com",
        pass: "1c2a3r4l5o6s2021"
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
                subject: "Ol??, sua recupera????o de senha do Cast4All chegou!",
                text: "Se voc?? digitou um email que na?? est?? cadastrado, sua senha a seguir ser?? nula!, Senha cadastrada: " + senhaT
            }).then(message => {
                console.log(message);
            }).catch(err => {
                console.log(err);
            })
            res.sendFile(__dirname+"/Cast4All/login.html")
          }).catch(err =>{
            res.sendFile(__dirname+"/Cast4All/RecuperarSenhaIndex.html")
          })
});

app.post("/auth", function(req,res){
    const user = req.body.email
    const password = req.body.senha
   Usuarios.findAll({where: {email: user, senha: password}}).then(function(usuarios){
       if (usuarios == ''){
        res.sendFile(__dirname+"/Cast4All/login.html")
       }else{
           Usuarios.update({stats: 'logado'},{where: {email: user}}).then(result => console.log(result)).catch(err => console.log(err))
           Usuarios.increment('acessos', {by: 1, where: {email:user}});
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

app.get('/logout',function(req,res){
    Usuarios.findOne({
        attributes: ['email'],
        where: {stats: 'logado'},
      })
      .then(function(usuarios) {
          stas = usuarios
          statT = stas['email']
          console.log(statT)
          Usuarios.update({stats: 'deslogado'},{where: {email: statT}}).then(result => console.log(result)).catch(err => console.log(err))
          res.sendFile(__dirname+"/Cast4All/login.html")
      })
})



app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
})