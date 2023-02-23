import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8081/api",
});

export const callAllBlock = async () => {
  return await request.post("/block/all", 1);
};

export const callRecentBlock = async () => {
  return await request.post("/block/recent", 1);
};

export const callBlockInfo = async (blockNumber) => {
  return await request.post("/block/info", { blockNumber: blockNumber });
};

export const callTxInfo = async (txHash) => {
  return await request.post("/block/txInfo", { txHash: txHash });
};

export const callBlockPage = async (page, limit) => {
  return await request.post("/block/page", { page: page, limit: limit });
};

export const callTxPage = async (page, limit) => {
  return await request.post("/tx/page", { page: page, limit: limit });
};

export const callBlockTxPage = async (page, limit, blockNumber) => {
  return await request.post("/tx/blocktx", {
    page: page,
    limit: limit,
    blockNumber: blockNumber,
  });
};

export const callAddressPage = async (address, page, limit) => {
  return await request.post("/tx/address", {
    address: address,
    page: page,
    limit: limit,
  });
};

export const callLatestBlock = async () => {
  return await request.post("/block/latest", 1);
};

export const callLatestTx = async () => {
  return await request.post("/tx/latest", 1);
};

export const callAddressLatestTx = async (address) => {
  return await request.post("/tx/addresslatest", address);
};

export const mainSearch = async (searchWord) => {
  return await request.post("block/search", { searchWord: searchWord });
};
