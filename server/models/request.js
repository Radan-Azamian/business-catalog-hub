const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Request = sequelize.define('Request', {
    clientName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clientPhone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clientEmail: {
        type: DataTypes.STRING,
        allowNull: true
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    
    selectedItems: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '' 
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Pending'
    }
});

module.exports = Request;