const morgan = require("morgan");
const { stream } = require("./logger");

module.exports = morgan("tiny", { stream: stream });
