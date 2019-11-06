const mdl = require('../../models');
const User = require('../../domain/users');
module.exports = function (req, res) {
    const body = req.body;
    const user = new User(body);
    const { valid, errors } = user.validate();
    if (!valid) {
        console.log('[not validate]', errors);
        return res.status(422).json(errors);
    }
    mdl.User.create(user)
        .then(r => {
            res.send('success');
        })
        .catch(e => {
            res.send('error');
        })
}
