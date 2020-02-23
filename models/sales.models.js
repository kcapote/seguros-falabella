
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SalesSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        index: true,
        autopopulate: true
    },
    createdAt: {
        type: Date,
        dafault: Date.now()
    },
    updatedAt: {
        type: Date
    },
    deletedAt: {
        type: Date
    },
});

module.exports = mongoose.model('Sales',SalesSchema);