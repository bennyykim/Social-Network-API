const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            length: [1, 280],
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                types: Schema.Types.ObjectId,
                ref: 'Reaction',
            },
        ],
    },
    {
        toJson: {
            virtuals: true,
        },
    },
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought