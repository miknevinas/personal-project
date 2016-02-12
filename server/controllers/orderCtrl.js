var Order = require('./../models/Orders');
var User = require('./../models/User');

module.exports = {

    create: function(req, res) {
        User.findById(req.query.user_id, function(err, result){    //find the user
            if (err) {
                return res.status(500).send(err);
            } else {
                req.body.user= req.user._id;
                Order.create(req.body, function(createErr, createResult){      //make an order
                    if (createErr) {
                        return res.status(500).send(createErr);
                    } else {
                        res.send(createResult);
                    }
                })
            }
        })
    },

    read: function(req, res) {
        Order
            .find({})
            .populate('user')
            .populate('items')
            .populate('items.item')
            .exec(function(err, result){
            if (err) {
                return res.status(500).send(err);
            } else {
                res.send(result);
            }
        })
    },
    
    update: function(req, res, next) {
        Order.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, result) {
            if (err) { 
                next(err);
            } else {
                res.status(200).send(result);
            }
        });
    }
}