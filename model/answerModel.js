var config = require("../config/dbConfig");
const answerModel = config.sequelize.define('answerTbl', {
    // attributes
    answerid: {
        type: config.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    answer: { //coco
        type: config.Sequelize.STRING,
        allowNull: false
            // allowNull defaults to true

    },
    quesion: { //coco
        type: config.Sequelize.STRING,
        allowNull: false
            // allowNull defaults to true

    }
}, {
    // options
    freezeTableName: true,
    tableName: "answerTbl"
})

answerModel.sync({ force: false }) //table creationf status while true. False doesnot create table
    .then(function(result) {
        console.log("table answerTbl created");
    })
    .catch(function(error) {
        console.log("table answerTbl not created");
    })

module.exports = {
    answerModel
};