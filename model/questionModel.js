var config = require("../config/dbConfig");
const questionModel = config.sequelize.define('questionTbl', {
    // attributes
    questionId: {
        type: config.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    question: { //what is your pet name
        type: config.Sequelize.STRING,
        allowNull: true
    },
    username: { //coco
        type: config.Sequelize.STRING,
        allowNull: true
            // allowNull defaults to true

    }
}, {
    // options
    freezeTableName: false,
    tableName: "questionTbl"
})

questionModel.sync({ force: false }) //table creationf status while true. False doesnot create table
    .then(function(result) {
        console.log("table questionTbl created");
    })
    .catch(function(error) {
        console.log("table questionTbl not created");
    })

module.exports = {
    questionModel
};