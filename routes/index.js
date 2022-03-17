const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);//what is wrong with this code?

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
