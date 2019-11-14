module.exports = function(req, res) {
  const mdl = require("../../models");
  const id = req.params.id;
  mdl.User.findByPk(id)
    .then(result => {
      if (!result) {
        return res.notFound();
      }
      res.success(result);
    })
    .catch(err => {
      res.serverError(err);
    });
};
