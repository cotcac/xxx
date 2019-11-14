const { transports, createLogger, format } = require("winston");

const logger = createLogger({
  format: format.combine(format.timestamp(), format.json(), format.colorize()),
  transports: [
    // new transports.Console(),remove this
    new transports.File({
      filename: "logs/error/error.log",
      level: "error",
      maxsize: 5242880, //5MB
      maxFiles: 5
    }),
    new transports.File({
      filename: "logs/activity/activity.log",
      level: "info",
      maxsize: 5242880, //5MB
      maxFiles: 5
    })
  ]
});
// your magic
// now only console in dev environment.
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple()
    })
  );
}

module.exports.logger = logger;
module.exports.stream = {
  write: function(message) {
    logger.info(message);
  }
};
