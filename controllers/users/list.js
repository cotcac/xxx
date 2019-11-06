module.exports = function (req, res) {
    const mdl = require('../../models');

  
    mdl.User.findAll( {attributes: ['name', 'age']})
    .then(r=>{
        res.json(r);
    })
    .catch(e=>{
        res.send('error');
    })
  }
  