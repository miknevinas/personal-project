var Menu = require('./../models/Menu');

module.exports = {
    
    create: function(req, res) {
        var newMenuItem = new Menu(req.body);
        newMenuItem.save(function(err, result) {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.send(result);
            }
        });
    },
    
    read: function(req, res) {
        Menu
        .find({})
        .exec(function(err, result) {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.send(result);
            }
        });
    },
    
    update: function(req, res) {
        Menu.findByIdAndUpdate(req.params.id, function(err, result) {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.send(result);
            }
        });
    },
    
    delete: function(req, res) {
        Menu.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.send(result);
            }
        });
    }
}