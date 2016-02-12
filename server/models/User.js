var mongoose = require('mongoose');
var schema = mongoose.Schema;
var orderSchema = require('./Orders')

var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({                
    email: {type: String, lowercase: true},
    password: {type: String},
    admin: {type: Boolean, default: false},
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Orders'}]
});


//Register jargon
userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password'))return next();
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return next(null, user);
});
userSchema.methods.verifyPassword = function(reqBodyPassword) {
    var user = this;
    return bcrypt.compareSync(reqBodyPassword, user.password);
};

module.exports = mongoose.model('User', userSchema);