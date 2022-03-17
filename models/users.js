const { Schema, model } = require('mongoose'); 

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
    
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "must be valid email"]
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thoughts',
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'users',
        }]
    },
    {
        toJSON: {
            getters: true,
            virtual: true,
        },
    }
);
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
}); 

const users = model('users', userSchema);

module.exports = users;

