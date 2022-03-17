const { Schema, model } = require('mongoose'); 
const { Schema, model } = require('reactionSchema');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: time => {
                return new Date(time).toLocaleDateString();
            }
        },
        username: {
            type: String, 
            required: true,
        },
        reactions: [reactionSchema]
    }
);

thoughtSchema.virtual('reactionsCount').get(function() {
    return this.reactions.length; 
});  

const thought = model('thought', thoughtSchema);

module.exports = thought; 