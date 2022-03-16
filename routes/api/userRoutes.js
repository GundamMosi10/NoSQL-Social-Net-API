const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser, 
    deleteUser,
    addThought,
    removeThought,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser); // /api/users

router.route('/:userId').get(getSingleUser).delete(deleteUser); // /api/users/:userId 

router.route('/:userId/thoughts').post(addThought); // /api/users/:userId/thoughts

router.route('/:userId/thoughts/:thoughtId').delete(removeThought); // /api/users/:userId/thoughts/:thoughtId

module.exports = router;

