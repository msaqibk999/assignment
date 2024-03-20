const Item = require('../models/item');

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createItem = async (req, res) => {
    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
