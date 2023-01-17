const router = require("express").Router();
const paginatedResults = require("../middlewares/paginatedResults");

const pool = require("../config/keys");

router.get("/", paginatedResults("entries"), async (req, res) => {
  res.json(res.paginatedResults);
});

module.exports = router;
