module.exports = async function(req, res) {
  const mdl = require("../../models");
  const id = req.params.id;
  mdl.User.findAndCountAll({
    where: { id: id }
  })
    .then(r => {
      // check id exist
      if (r.count === 0) {
        return res.notFound();
      }
      // delete
      mdl.User.destroy({ where: { id: id } })
        .then(result => {
          res.success(result);
        })
        .catch(err => {
          return res.serverError(err);
        });
    })
    .catch(err => {
      return res.serverError(err);
    });
};
