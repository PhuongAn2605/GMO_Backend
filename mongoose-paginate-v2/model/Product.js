const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: String, required: true }
},{
    timestamps: true
});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);