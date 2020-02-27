var config = require("../config/dbConfig");
const petbook = config.sequelize.define('adoptdetail', {
        // attributes
        bid: {
            type: config.Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        adoptpetname: {
            type: config.Sequelize.STRING,
            allowNull: true
        },
        adoptbreed: {
            type: config.Sequelize.STRING,
            allowNull: true
                // allowNull defaults to true

        },
    },

    {
        // options
        freezeTableName: true,
        tableName: "adoptdetail"
    })

petbook.sync({ force: false }) //table creationf status while true. False doesnot create table
    .then(function(result) {
        console.log("table adopt created");
    })
    .catch(function(error) {
        console.log("table adopt not created");
    })

module.exports = {
    petbook
};