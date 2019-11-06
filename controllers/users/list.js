module.exports = function (req, res) {
    const mdl = require('../../models');
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || parseInt(process.env.PER_PAGE);
    const skip = page > 0 ? ((page - 1) * limit) : 0;


    mdl.User.findAll({
        offset: skip,
        limit: limit,
    })
        .then(data => {
            res.pagination(page, data, limit);
        })
        .catch(err => {
            res.serverError(err);
        })
}
