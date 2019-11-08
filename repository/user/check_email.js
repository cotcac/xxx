module.exports = (email) => {
    const mdl = require('../../models');
    return new Promise(async (res, rej) => {
        try {
            const checkData = await mdl.User.findAndCountAll({
                where: {
                    email,
                }, raw: true
            });
            res(checkData.count)

        } catch (error) {
            rej(error)

        }

    })
}