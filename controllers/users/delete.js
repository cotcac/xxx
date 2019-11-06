module.exports = async function (req, res) {
    const mdl = require('../../models');
    const id = req.params.id;
    const checkId = await mdl.User.findAndCountAll({
        where: { id: id }
    })
    if (checkId.count === 0) {
        return res.send('not found');
    }
    // delete
    mdl.User.destroy({ where: { id: id } })
        .then(r => {
            res.json(r);
        })
        .catch(e => {
            res.send('error');
        })
}
