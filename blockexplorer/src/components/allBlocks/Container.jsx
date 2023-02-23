import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { callBlockPage, callLatestBlock } from "../../api";
import AllBlocksComp from "./Component";
import FooterComp from "./Component";

const AllBlocksContainer = () => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [blockList, setBlockList] = useState();
  const [latestBlockNum, setLatestBlockNum] = useState();
  const navigate = useNavigate();

  const moveToBlockInfo = (blockNumber) => {
    navigate(`/blockinfo/${blockNumber}`);
  };

  const moveBlockTxns = (blockNumber) => {
    navigate(`/blockTxs/${blockNumber}`);
  };
  const moveToAddress = (address) => {
    navigate(`/address/${address}`);
  };

  const handleSelect = (e) => {
    setLimit(+e.target.value);
    setPage(1);
  };

  const shortWords = (str, length = 30) => {
    let result = "";
    if (str.length > length) {
      result = str.substr(0, length - 2) + "...";
    } else {
      result = str;
    }
    return result;
  };

  const nextPage = () => {
    if (page == maxPage) return;
    setPage((page) => page + 1);
  };

  const prevPage = () => {
    if (page == 1) return;
    setPage(page - 1);
  };

  const setMaxPageFunc = () => {
    setMaxPage(parseInt(latestBlockNum / limit) + 1);
  };

  const getLatestBlock = async () => {
    const data = await callLatestBlock();
    setLatestBlockNum(data.data.data.id);
  };

  const getPageBlock = async () => {
    const data = await callBlockPage(page, limit);
    setBlockList(data.data.data);
  };

  useEffect(() => {
    setMaxPageFunc();
  }, [limit, latestBlockNum]);

  useEffect(() => {
    getPageBlock();
  }, [page, limit]);

  useEffect(() => {
    getLatestBlock();
  }, []);

  return (
    <AllBlocksComp
      blockList={blockList}
      shortWords={shortWords}
      latestBlockNum={latestBlockNum}
      page={page}
      limit={limit}
      nextPage={nextPage}
      prevPage={prevPage}
      maxPage={maxPage}
      handleSelect={handleSelect}
      moveToBlockInfo={moveToBlockInfo}
      moveBlockTxns={moveBlockTxns}
      moveToAddress={moveToAddress}
    ></AllBlocksComp>
  );
};

export default AllBlocksContainer;
