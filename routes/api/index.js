const router = require('express').Router();
const userRoutes = require('./userRoutes'); //what is wrong with this line ?
const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes); 

module.eports = router;

