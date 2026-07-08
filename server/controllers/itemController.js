const Item = require('../models/item');

// this is the query to fetch all items from the database, with optional filtering by category
const getItems = async (req, res) => {
    try {
        const { category } = req.query;
        let queryCondition = {};

        if (category) {
            queryCondition.category = category;
        }

        const items = await Item.findAll({ where: queryCondition });
        res.status(200).json(items);
    } catch (error) {
        // 👇 ADD THIS LINE RIGHT HERE TO REVEAL THE HIDDEN ROADBLOCK IN TERMINAL
        console.error("❌ PHYSICAL DATABASE FETCH FAILURE DETAILS:", error);
        
        res.status(500).json({ message: 'Server Error: Unable to fetch items from PostgreSQL' });
    }
};

// this is the query to fetch a single item by its ID
const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if(!item) {
            return res.status(404).json({message: 'Item not found'});
        }
        res.status(200).json(item);
    } catch (error) {
        res.status.json({message: 'Server Error: Invalid Item ID'});
    }
};

module.exports = {
    getItems,
    getItemById
}