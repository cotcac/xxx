const mdl = require('../../models');
const User = require('../../domain/users');
module.exports = function (req, res) {
    const id = req.params.id;
    const body = req.body;
    const user = new User(body);
    const { valid, errors } = user.validate();
    if (!valid) {
        return res.invalidInput(errors);
    }
    mdl.User.findAndCountAll({
        where: { id: id }
    }).then(r => {
        // check id exist
        if (r.count === 0) {
            return res.notFound();
        }
        // delete
        mdl.User.update(user,{ where: { id: id } })
            .then(result => {
                res.success(result);
            })
            .catch(e => {
                res.serverError(err);
            })

    }).catch(e => {
        res.serverError(err);
    })
}
