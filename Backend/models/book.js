const Sequelize = require("sequelize");
const sequelize = require('../utils/database');

const Book = sequelize.define('book', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type:Sequelize.STRING
    },
    currentFine:{
        type:Sequelize.INTEGER,
        defaultValue: 0
    },
    status:{
        type:Sequelize.STRING,
        allowNull:false,
    }

});

module.exports = Book;