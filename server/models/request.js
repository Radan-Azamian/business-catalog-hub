const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: [true, 'Client name is required'],
        trim: true
    },
    clientPhone: {
        type: String,
        required: [true, 'Contact phone number is required']
    },
    clientEmail: {
        type: String,
        trim: true
    },
    notes: {
        type: String
    },
    selectedItems: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item', // Creates a relational reference link pointing directly to the Item schema
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    status: {
        type: String,
        enum: ['Pending', 'Contacted', 'Completed'],
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);