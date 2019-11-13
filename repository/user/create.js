const mdl = require("../../models");
module.exports = user => {
  return new Promise((res, rej) => {
    mdl.User.create(user)
      .then(r => {
        res(r);
      })
      .catch(e => {
        rej(e);
      });
  });
};
