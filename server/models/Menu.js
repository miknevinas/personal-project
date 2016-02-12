var mongoose = require('mongoose');
var menuSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true, index: true},
    description: {type: String},
    type: {type: String},
    price: {type: Number, required: true, min: 0},
    amount: {type: Number}
})

module.exports = mongoose.model('Menu', menuSchema); 