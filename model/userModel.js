var config = require("../config/dbConfig");
const User = config.sequelize.define('user', {
    // attributes
    id: {
        type: config.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: {
        type: config.Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: config.Sequelize.STRING,
        allowNull: false
        // allowNull defaults to true

    },
    email_address: {
        type: config.Sequelize.STRING,
        allowNull: false
        // allowNull defaults to true

    },
    address: {
        type: config.Sequelize.STRING,
        allowNull: false
        // allowNull defaults to true

    },
    user_image: {
        type: config.Sequelize.STRING,
        allowNull: false
        // allowNull defaults to true

    },

    username: {
        type: config.Sequelize.STRING,
        allowNull: false
        // allowNull defaults to true

    },
    password: {
        type: config.Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: config.Sequelize.STRING(50),
        allowNull: false
    }
},

    {
        // options
        freezeTableName: true,
        tableName: "userdetails"
    })

User.sync({ force: false })
    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.log(error)
    })

module.exports = {
    User
};