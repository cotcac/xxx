const express = require("express");
const router = express.Router();
const axios = require("axios");
/* GET home page. */
router.get("/list", (req, res) => {
  axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then(r => {
      res.json({ status: "success", data: r.data });
    })
    .catch(e => {
      res.serverError(e);
    });
});

module.exports = router;
