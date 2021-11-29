const Sequelize = require("sequelize")

const sequelize = new Sequelize('usuarios','root', 'carlos123', {
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
})


/*sequelize.authenticate()
.then(function(){
    console.log("Conexão com o BD efetuada com sucesso!");
}).catch(function(){
    console.log("Conexão mal sucedida!");
});*/


module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}