const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought, 
    updateThought, 
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts).post(createThought); // /api/thoughts

router
    .route('/:thoughtId') // /api/thoughts/:thoughtId
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought); 

router.route("/:thoughtId/reactions").post(addReaction); // /api/thoughts/:thoughtId/reactions 
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction); // /api/thoughts/:thoughtId/reactions/:reactionsId

module.exports = router; 

