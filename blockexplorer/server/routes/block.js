const router = require("express").Router();
const Web3 = require("web3");
const axios = require("axios");
const db = require("../models/index.js");

const { Block, Transaction } = require("../models");

const request = axios.create({
  method: "POST",
  baseURL: "http://localhost:8080",
  headers: {
    "content-type": "application/json",
  },
});

const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://localhost:8082")
);

const allBlock = async () => {
  const latestBlock = await web3.eth.getBlock("latest");

  for (let i = 0; i <= latestBlock.number; i++) {
    let data = await web3.eth.getBlock(i);
    const newBlock = await Block.create(data);
    for (let j = 0; j < data.transactions.length; j++) {
      let at = await web3.eth.getTransaction(data.transactions[j]);
      const transaction = await Transaction.create(at);
      newBlock.addTransaction(transaction);
    }
  }
};

web3.eth.subscribe("newBlockHeaders", async (error, result) => {
  if (!error) {
    const newBlockData = await web3.eth.getBlock(result.number);
    const newBlock = await Block.create(newBlockData);

    for (let i = 0; i < newBlockData.transactions.length; i++) {
      let at = await web3.eth.getTransaction(newBlockData.transactions[i]);
      const transaction = await Transaction.create(at);
      newBlock.addTransaction(transaction);
    }

    // console.log(result.miner);
    console.log("뉴뉴뉴뉴진스");
  }
});

router.post("/all", async (req, res) => {
  try {
    const block = await Block.findAll();
    if (block != 0) return;

    allBlock();

    res.send({ isError: false, data: block });
  } catch (error) {
    res.send({ isError: true });
  }
});

router.post("/recent", async (req, res) => {
  try {
    const block = await Block.findAll({
      order: [["id", "DESC"]],
      limit: 6,
    });

    const transaction = await Transaction.findAll({
      order: [["id", "DESC"]],
      limit: 6,
      include: [
        {
          model: db.Block,
        },
      ],
    });

    res.send({ isError: false, data: block, trans: transaction });
  } catch (error) {
    console.log(error);
    res.send({ isError: true });
  }

  router.post("/info", async (req, res) => {
    try {
      const info = await Block.findOne({
        where: {
          number: req.body.blockNumber,
        },
      });
      res.send({ isError: false, data: info });
    } catch (error) {
      res.send({ isError: true });
    }
  });

  router.post("/txInfo", async (req, res) => {
    console.log(req.body);
    try {
      const info = await Transaction.findOne({
        where: {
          hash: req.body.txHash,
        },
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
});

router.post("/page", async (req, res) => {
  console.log(req.body);
  try {
    const info = await Block.findAll({
      order: [["id", "DESC"]],
      limit: req.body.limit,
      offset: (req.body.page - 1) * req.body.limit,
    });
    res.send({ isError: false, data: info });
  } catch (error) {
    res.send({ isError: true });
  }
});

router.post("/latest", async (req, res) => {
  try {
    const info = await Block.findOne({
      order: [["id", "DESC"]],
      limit: 1,
    });
    res.send({ isError: false, data: info });
  } catch (error) {
    res.send({ isError: true });
  }
});

router.post("/search", async (req, res) => {
  console.log(req.body);
  try {
    const blockNumber = await Block.findOne({
      where: {
        number: req.body.searchWord,
      },
    });
    const address = await Block.findOne({
      where: {
        miner: req.body.searchWord,
      },
    });
    const txHash = await Transaction.findOne({
      where: {
        hash: req.body.searchWord,
      },
    });
    res.send({
      isError: false,
      data: {
        blockNumber: blockNumber?.number,
        address: address?.miner,
        txHash: txHash?.hash,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({ isError: true });
  }
});

module.exports = router;
