const request = require('../models/request');

const createRequest = async (req, res) => {
    try {
        const { clientName, clientPhone, clientEmail, notes, selectedItems } = req.body;
        if(!clientName || !clientPhone) {
            return res.status(400).json({ message: 'Client name and phone are required' });
        }
    const newRequest = await request.create({
        clientName,
        clientPhone,
        clientEmail,
        notes,
        selectedItems
    });
    res.status(201).json(
        {
            success: true,
            message: 'Request submitted successfully',
            data: newRequest
        }
    );
} catch (error) {
    res.status(500).json({ message: 'Error creating request', error: error.message });
}
};

module.exports = {
    createRequest
};