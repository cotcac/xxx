module.exports = async function (req, res) {
    const mdl = require('../../models');
    const id = req.params.id;
    mdl.User.findAndCountAll({
        where: { id: id }
    }).then(r => {
        // check id exist
        if (r.count === 0) {
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

    }).catch(e => {
        console.log(e);
        return res.status(500).send('error');
    })


}
