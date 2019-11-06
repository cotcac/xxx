const mdl = require('../../models');
const User = require('../../domain/users');
module.exports = function (req, res) {
    const body = req.body;
    const user = new User(body);
    const { valid, errors } = user.validate();
    if (!valid) {
        return res.invalidInput(errors);
    }
    mdl.User.create(user)
        .then(result => {
            res.success(result);
        })
        .catch(err => {
            res.serverError(err);
        })
}
