module.exports = async function (req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || parseInt(process.env.PER_PAGE);
    const skip = page > 0 ? ((page - 1) * limit) : 0;
    const repo = require('../../repository/user/list');
    try {
        const data = await repo(skip, limit, '/users'+req.url);
        res.pagination(page, data, limit);
    } catch (err) {
        res.serverError(err);
    }
}
