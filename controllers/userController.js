const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) { //gets all users 
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) { //gets a single user with an id
        User.findOne({ _id: req.params.userId })
            .select('-_v')
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user with that ID exists'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) { //creates a user 
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => (500).json(err));
    },
    deleteUser(req, res) { //deletes a user and their thoughts associated with the user
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => 
                !user 
                    ? res.status(404).json({ message: 'No user with that ID exists'})
                    : Thought.deleteMany({ _id: {$in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User and associated thoughts deleted!'}))
            .catch((err) => res.status(500).json(err));
    },
};

//add a thought ??
//remove a thought ??

