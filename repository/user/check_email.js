module.exports = async email => {
  const mdl = require("../../models");
  try {
    const checkData = await mdl.User.findAndCountAll({
      where: {
        email
      },
      raw: true
    });
    return checkData.count;
  } catch (error) {
    throw new Error(error);
  }
};
