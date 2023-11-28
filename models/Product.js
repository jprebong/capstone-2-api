const mongoose = require('mongoose');

// [SECTION] Schema/Blueprint

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'is Required']
	},
	description: {
		type: String,
		required: [true, 'is Required']
	},
	price: {
		type: Number,
		required: [true, 'Product Price is Required']
	},
	imageUrl: {
		type: String,
		required: [true, 'Image URL is required'],
	  },
	isActive: {
		type: Boolean, 
		default: true
	},
	createdOn: {
		type: Date,
	    default: new Date()
	},
	customers: [
		{
			userId: {
				type: String,
				required: [true, 'product ID is required']
			},
			orderdOn: {
				type: Date,
				default: new Date()
			}
		}
	]
});

module.exports = mongoose.model('Product', productSchema);