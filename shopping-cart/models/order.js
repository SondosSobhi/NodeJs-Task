var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: Schema.Types.Object, ref: 'User'},
    cart: {type: Object, required: true}
});

module.exports = mongoose.model('Order', schema);