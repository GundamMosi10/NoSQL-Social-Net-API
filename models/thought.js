const { Schema, Types, model } = require('mongoose'); 


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: time => {
                return new Date(time).toLocaleDateString();
            }
        },
    }
)

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
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

thoughtSchema.virtual('reactionsCount').get(function() {
    return this.reactions.length; 
});  

const Thought = model('Thought', thoughtSchema);

module.exports = Thought; 