const Bill = require('../models/bill');
const Item = require('../models/item');
const mongoose = require('mongoose');

exports.createBill = async (req, res) => {
    try {
        let totalAmount = 0;

        for (const item of req.body.items) {
            const inventoryItem = await Item.findById(item._id);
            if (!inventoryItem) {
                throw { status: 404, message: `Item with ID ${item._id} not found` };
            }
            if (item.quantity > inventoryItem.quantity) {
                throw { status: 400, message: `Not enough items in inventory for item with ID ${item._id}` };
            }
            totalAmount += inventoryItem.price * item.quantity;
            inventoryItem.quantity -= item.quantity;
            await inventoryItem.save();
        }

        const bill = new Bill({
            items: req.body.items,
            totalAmount: totalAmount
        });

        const newBill = await bill.save();
        res.status(201).json(newBill);
    } catch (err) {
        const statusCode = err.status || 500;
        res.status(statusCode).json({ message: err.message });
    }
};


exports.getAllBills = async (req, res) => {
    try {
        const bills = await Bill.find();
        res.status(200).json(bills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getBillById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw { status: 400, message: "Invalid id" };
        }
        
        const bill = await Bill.findById(req.params.id);
        if (!bill) {
            throw { status: 400, message: "Bill not found" };
        }
        
        res.status(200).json(bill);
    } catch (err) {
        const statusCode = err.status || 500;
        res.status(statusCode).json({ message: err.message });
    }
};

