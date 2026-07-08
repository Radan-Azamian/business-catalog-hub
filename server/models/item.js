const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // We will create this connection next

const Item = sequelize.define('Item', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.TEXT,
        defaultValue: 'https://www.google.com/imgres?q=placeholder%20image&imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F1980276924%2Fvector%2Fno-photo-thumbnail-graphic-element-no-found-or-available-image-in-the-gallery-or-album-flat.jpg%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3DZBE3NqfzIeHGDPkyvulUw14SaWfDj2rZtyiKv3toItk%3D&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Fplaceholder-image&docid=7Q1L1mDaxZwCnM&tbnid=0osLVeOtHK0n3M&vet=12ahUKEwib-tOvzJiVAxWxvokEHdXBN_0QnPAOegQIQxAA..i&w=612&h=612&hcb=2&itg=1&ved=2ahUKEwib-tOvzJiVAxWxvokEHdXBN_0QnPAOegQIQxAA'
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },
    features: {
        type: DataTypes.TEXT, // PostgreSQL stores simple arrays or strings easily
        defaultValue: '',
    }
});

module.exports = Item;