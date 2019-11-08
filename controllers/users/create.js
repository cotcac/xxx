const User = require('../../domain/users');
const bcrypt = require('bcryptjs');//encrypt password
const repo = require('../../repository/user/create');
const check_email = require('../../repository/user/check_email');
module.exports = async function (req, res) {
    const body = req.body;
    const user = new User(body);
    const { valid, errors } = user.validate();
    if (!valid) {
        return res.invalidInput(errors);
    }

    try {
        // check email
        const countEmail = await check_email(user.email);
        if(countEmail>0){
            return res.invalidInput(null,"Email already exist")
        }
        // hash password
        user.password = bcrypt.hashSync(user.password);
        const data = await repo(user);
        res.success(data);
    } catch (err) {
        res.serverError(err);
    }
}
