var config = require("../config/dbConfig");
const Pet = config.sequelize.define('petdetails', {
        // attributes
        id: {
            type: config.Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        petname: {
            type: config.Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: config.Sequelize.STRING,
            allowNull: false
                // allowNull defaults to true

        },
        breed: {
            type: config.Sequelize.STRING,
            allowNull: false
                // allowNull defaults to true

        },
        age: {
            type: config.Sequelize.STRING,
            allowNull: false
                // allowNull defaults to true

        },
        gender: {
            type: config.Sequelize.STRING,
            allowNull: false
                // allowNull defaults to true

        },

        pet_image: {
            type: config.Sequelize.STRING,
            allowNull: false
                // allowNull defaults to true

        }
    },

    {
        // options
        freezeTableName: true,
        tableName: "petdetails"
    })

Pet.sync({ force: false }) //table creationf status while true. False doesnot create table
    .then(function(result) {
        console.log("table pet created");
    })
    .catch(function(error) {
        console.log("table pet not created");
    })

module.exports = {
    Pet
};