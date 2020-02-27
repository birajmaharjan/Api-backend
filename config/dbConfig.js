const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('pet', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

sequelize.authenticate()
    .then(function() {
        console.log('database connected successfully');
    })
    .catch(function(error) {

        console.log(error);
    })
    //things to throw to index.js

module.exports = {
    Sequelize,
    sequelize
}