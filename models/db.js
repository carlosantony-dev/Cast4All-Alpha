const Sequelize = require("sequelize")

const sequelize = new Sequelize('usuarios','root', 'carlos123', {
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}