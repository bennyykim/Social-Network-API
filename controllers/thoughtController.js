const { Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then(async (thoughts) => {
                const thoughtObj = {
                    thoughts,
                };
                return res.json(thoughtObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then(async (thought) =>
                !thought
                    ? res.status(404).json({ message: 'No user with that ID ' })
                    : res.json({
                        thought
                    }))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            });
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {

    },

    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.userId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No such student exists' })
                    : res.json({ message: 'Thought deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        ).then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json(thought)
        )
            .catch((err) => res.status(500));
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactionId: req.params.reactionId } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};