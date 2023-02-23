const router = require("express").Router();

const block = require("./block");
const tx = require("./tx");

router.use("/block", block);
router.use("/tx", tx);

module.exports = router;
