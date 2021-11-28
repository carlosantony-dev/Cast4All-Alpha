const db = require('./db')

const Usuarios = db.sequelize.define('users', {
    nome: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.STRING
    },
    nascimento: {
        type: db.Sequelize.DATE
    }
})

module.exports = Usuarios;

