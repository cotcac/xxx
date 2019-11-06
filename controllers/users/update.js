const mdl = require('../../models');
const User = require('../../domain/users');
module.exports = function (req, res) {
    const id = req.params.id;
    const body = req.body;
    const user = new User(body);
    const { valid, errors } = user.validate();
    if (!valid) {
        console.log('[not validate]', errors);
        return res.status(422).json(errors);
    }
    mdl.User.findAndCountAll({
        where: { id: id }
    }).then(r => {
        // check id exist
        if (r.count === 0) {
            return res.send('not found');
        }
        // delete
        mdl.User.update(user,{ where: { id: id } })
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
