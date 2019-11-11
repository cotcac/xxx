const express = require('express');
const router = express.Router();
/* GET home page. */
router.get('/', require('./list'));
router.post('/', require('./create'));
router.delete('/:id', require('./delete'));
router.put('/:id', require('./update'));
router.get('/:id', require('./read'));


module.exports = router;
