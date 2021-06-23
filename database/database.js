const Sequelize = require('sequelize')

const connection = new Sequelize('perguntas', 'root', 'joatha', {

    host: "localhost",
    dialect:'mysql'
})

/*
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
*/

module.exports = connection