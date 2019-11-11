const express = require('express');
const router = express.Router();
const verifyToken = require('../../helper/jwt');
const make_sure_auth = require('make-sure-auth');
// const validator = require('./validator');
/* GET home page. */
router.get('/', require('./list'));
router.post('/', require('./create'));
router.delete('/:id', verifyToken("admin"), require('./delete'));
router.put('/:id', verifyToken(), require('./update'));
router.get('/:id', verifyToken(), require('./read'));

module.exports = router;
