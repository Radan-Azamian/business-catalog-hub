const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const request = sequelize.define('Request', {
    clientName: {
        type: DataTypes.STRING,
        allowNull:false,
        validate : {notEmpty: true}
        },
        clientPhone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clientEmail: {
        type: DataTypes.STRING,
        validate: { isEmail: true } // Native column validation
    },
    notes: {
        type: DataTypes.TEXT
    },
    selectedItems: {
        type: DataTypes.JSONB,
        defaultValue: []
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Contacted', 'Completed'),
        defaultValue: 'Pending'
    }
});

module.exports = Request;