const { logger } = require("./helper/logger");
module.exports = function(app) {
  // visitor
  app.use("/", require("./controllers/index"));
  app.use("/", require("./controllers/auth"));
  app.use("/users", require("./controllers/users"));

  // Other Service

  app.use("/todos", require("./controllers/service_todos"));

  // admin
  app.use("/protected", require("./controllers/protected"));

  // error handler we need the next in order for the err to not work as req
  // eslint-disable-next-line
  app.use(function(err, req, res, next) {
    logger.error(err.stack);
    res.status(500).json(err.stack);
  });
  // Handle 404
  app.get("*", function(req, res) {
    res.notFound();
  });
};
