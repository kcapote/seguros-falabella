
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    sellIn: {
        type: Number,
        required: [true, 'El sellIn es requerido']
    },
    price: {
        type: Number,
        required: [true, 'El price es requerido']
    },    
    rules:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rule',
            index: true,
            autopopulate: true
        }
    ],

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

ProductSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Product',ProductSchema);