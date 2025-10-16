const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },  
    password: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});
const User=mongoose.model('User', UserSchema);
User.createIndexes(); // Ensure indexes are created for the User model
module.exports = User; // Export the User model for use in other parts of the application
// This model can be used to interact with the 'users' collection in MongoDB
