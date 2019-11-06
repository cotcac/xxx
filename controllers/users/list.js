module.exports = function (req, res) {
    const mdl = require('../../models');

  
    mdl.User.findAll()
    .then(r=>{
        res.json(r);
    })
    .catch(e=>{
        res.send('error');
    })
  }
  