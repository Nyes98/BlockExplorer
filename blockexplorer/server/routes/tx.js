const router = require("express").Router();
const db = require("../models/index.js");

const { Block, Transaction } = require("../models");
const { Op } = require("sequelize");

router.post("/page", async (req, res) => {
  try {
    const info = await Transaction.findAll({
      order: [["id", "DESC"]],
      limit: req.body.limit,
      offset: (req.body.page - 1) * req.body.limit,
      include: [
        {
          model: db.Block,
        },
      ],
    });
    res.send({ isError: false, data: info });
  } catch (error) {
    res.send({ isError: true });
  }
});

router.post("/blocktx", async (req, res) => {
  console.log(req.body);
  try {
    const info = await Transaction.findAll({
      where: {
        BlockNumber: req.body.blockNumber,
      },
      order: [["id", "DESC"]],
      limit: req.body.limit,
      offset: (req.body.page - 1) * req.body.limit,
      include: [
        {
          model: db.Block,
        },
      ],
    });
    res.send({ isError: false, data: info });
  } catch (error) {
    res.send({ isError: true });
  }
});

router.post("/latest", async (req, res) => {
  try {
    const info = await Transaction.findOne({
      order: [["id", "DESC"]],
      limit: 1,
    });
    res.send({ isError: false, data: info });
  } catch (error) {
    res.send({ isError: true });
  }
});

router.post("/address", async (req, res) => {
  try {
    const info = await Transaction.findAll({
      where: {
        [Op.or]: [{ from: req.body.address }, { to: req.body.address }],
      },
      order: [["id", "DESC"]],
      limit: req.body.limit,
      offset: (req.body.page - 1) * req.body.limit,
      include: [
        {
          model: db.Block,
        },
      ],
    });
    res.send({ isError: false, data: info });
  } catch (error) {
    res.send({ isError: true });
  }
});

router.post("/addresslatest", async (req, res) => {
  try {
    const info = await Transaction.findAll({
      where: {
        [Op.or]: [{ from: req.body.address }, { to: req.body.address }],
      },
    });
    res.send({ isError: false, data: info });
  } catch (error) {
    res.send({ isError: true });
  }
});

module.exports = router;
