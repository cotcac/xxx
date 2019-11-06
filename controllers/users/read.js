module.exports = function (req, res) {
    const mdl = require('../../models');
    const id = req.params.id;
    mdl.User.findByPk(id)
        .then(r => {
            res.json(r);
        })
        .catch(e => {
            res.send('error');
        })
}
