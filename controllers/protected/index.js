const express = require('express');
const router = express.Router();
const verifyToken = require('../../helper/jwt');

/* USER PROTECTED */
router.get('/', verifyToken(), function(req, res, next){
    res.send('send response with resource!')
});

// ADMIN PROTECTED

router.get('/admin', verifyToken('admin'), (req, res)=>{
    res.send('send response with resource!')
})


module.exports = router;
