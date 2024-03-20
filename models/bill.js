const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
