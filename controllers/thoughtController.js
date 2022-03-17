const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) { //gets all thoughts 
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) { //gets a single thought with a user ID
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                ? res.status(404).json({ messagge: 'No thought with that ID'})
                : res.json(thought) 
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) { //creates a thought 
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { username: req.body.username }, 
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) => 
            !user 
              ? res.status(404).json({
                    message: 'Thought created, but found no user with that ID',
                })
              : res.json('Created the thought')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    updateThought(req, res) { //updates a thought
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => 
                !thought
                  ? res.status(404).json({ message: 'No thought with this id'})
                  : res.json(thought) 
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteThought(req, res) { //deletes a thought 
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) => {
                console.log(thought);
              return !thought
                ? res.status(404).json({ message: 'No thought with this ID' })
                : User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                )
            })
            .then((user) => 
              !user
                ? res.status(404).json({
                    message: 'Thought deleted but no user with this id!',
                })
                : res.json({ message: 'Thought successfully deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) => 
              !thought
                ? res.status(404).json({ message: 'No thought with this id!'})
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } }},
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this Id!'})
                : res.json(thought) 
        )
        .catch((err) => res.status(500).json(err));
    },
};
