
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RuleSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Debe seleccionar un nombre']
    },
    factor: {
        type: Number,
        required: [true, 'Debe seleccionar un factor']
    },
    dayFrom: {
        type: Number,
        required: [true, 'Debe seleccionar un limite inferior']
    },
    dayTo: {
        type: Number,
        required: [true, 'Debe seleccionar un limite superior']
    },  
    target: {
        type: String,
        enum: ['SALEIN', 'PRICE'],
        default: 'SALEIN'
    }

});

module.exports = mongoose.model('Rule', RuleSchema);