const Item = require('../models/item');

// this is the query to fetch all items from the database, with optional filtering by category
const getItems = async (req, res) => {
    try {
        const {category} = req.query;
        let query = {};
        // the next 3 lines are to check if a category filter is provided
        if (category) {
            query.category = category;
        }
        const items = await Item.find(query);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({message: 'Server Error: unable to fetch items'});
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