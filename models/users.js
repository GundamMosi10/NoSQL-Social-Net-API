const { Schema, model } = require('mongoose'); 

const userSchema = new Schema(
    {
        username: String,
        required: true,
        unique: true,
        trimmed: true,
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const users = model('user', userSchema);

module.exports = users;

