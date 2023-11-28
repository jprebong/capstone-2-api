const mongoose = require('mongoose');

// SCHEMA/BLUEPRINT
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'firstName is Required']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is Required']
    },
    email: {
        type: String,
        required: [true, 'Email is Required']
    },
    password: {
        type: String,
        required: [true, 'Password is Required']
    },
    mobileNo: {
        type: Number,
        required: [true, 'Mobile No. is Required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    orders: [
        {
           productId: {
                type: String,
                required: [true, 'product ID is Required']
            },
            orderedOn: {
                type: Date,
                default: new Date()
            }
        }
    ]
});



// [SECTION] Model
module.exports = mongoose.model('User', userSchema); 