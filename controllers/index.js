const express = require("express");
const router = express.Router();
const { logger } = require("../helper/logger");
/* GET home page. */
router.get("/", function(req, res) {
  res.send("This message tell you that the app is healthy!!!");
});
// error examole
router.get("/error", function(req, res, next) {
  const fs = require("fs");
  fs.readFile("/file-does-not-exist", function(err, data) {
    if (err) {
      next(err); // Pass errors to Express.
    } else {
      res.send(data);
    }
  });
});
// Reuse api response
router.use(function(req, res, next) {
  //Form invalidate
  res.invalidInput = function(err, msg = "Request failed") {
    return res.status(422).json({
      success: false,
      message: msg,
      error_code: 422,
      data: err
    });
  };
  // From post success
  res.success = function(data) {
    return res.status(200).json({
      success: true,
      message: "Request successfully",
      data: data
    });
  };
  // Not Found
  res.notFound = function() {
    return res.status(404).send("Not Found!");
  };
  // list
  res.pagination = function(currentPage, result, itemsPerPage) {
    return res.status(200).json({
      success: true,
      message: "Request successfully",
      data: {
        results: result,
        pagination: {
          itemsPerPage: itemsPerPage,
          currentPageIndex: currentPage,
          next: result.length > itemsPerPage ? true : false
        }
      }
    });
  };
  //server error
  res.serverError = function(err = "Unknown Server error") {
    logger.error(err.stack);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      data: process.env.NODE_ENV === "development" ? err : "" //hide err in production
    });
  };
  next();
});

module.exports = router;
