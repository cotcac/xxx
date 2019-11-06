const express = require('express');
const router = express.Router();
// const validator = require('./validator');
/* GET home page. */
router.get('/', require('./list'));
router.post('/', require('./create'));
router.delete('/:id', require('./delete'));
// router.patch('/:id', validator, require('./edit'));
router.get('/:id', require('./read'));

module.exports = router;
