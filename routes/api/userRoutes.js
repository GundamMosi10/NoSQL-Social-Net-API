const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser, 
    deleteUser,
    updateUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser); // /api/users

router
    .route('/:userId') // /api/users/:userId 
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router.route("/:userId/friends").post(addFriend); 
router.route("/userId/friends/:friendId").delete(removeFriend);

//router.route('/:userId').get(getSingleUser).delete(deleteUser); // /api/users/:userId 

//router.route('/:userId').get(getSingleUser).put(updateUser); // /api/users/:userId  //what is wrong with this line?

//router.route('/:userId/friends').post(addFriend); // /api/users/:userId/friends

//router.route('/:userId/friends/:friendId').delete(removeFriend); // /api/users/:userId/friends/:friendId

module.exports = router;

