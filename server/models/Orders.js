var mongoose = require('mongoose');
var schema = mongoose.Schema;
var Menu = require('./Menu');

var orderSchema = new mongoose.Schema({        
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: {type: Date, default: Date.now},
    fulfilled: {type: Boolean, default: false},
    details: {type: String},
    price: {type: Number},
    items: [{item:{type: mongoose.Schema.Types.ObjectId, ref: 'Menu'},
            amount:Number, details: String}]
})

orderSchema.pre('save', function(next){
    /*var price = 0;
    items.forEach(function(item) {
        item.amount * 
})*/
    next();
})

module.exports = mongoose.model('orders', orderSchema); 