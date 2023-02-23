import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { callBlockTxPage, callLatestTx, callTxPage } from "../../api";
import BlockTxsComp from "./Component";

const BlockTxsContainer = () => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [txList, setTxList] = useState();
  const [latestTxNum, setLatestTxNum] = useState();
  const navigate = useNavigate();
  const params = useParams();

  const moveHome = () => {
    navigate("/");
  };

  const moveToTxInfo = (txHash) => {
    navigate(`/txinfo/${txHash}`);
  };

  const moveToAddress = (address) => {
    navigate(`/address/${address}`);
  };
  const moveToBlockInfo = (blockNumber) => {
    navigate(`/blockInfo/${blockNumber}`);
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
    setMaxPage(parseInt(latestTxNum / limit) + 1);
  };

  const getPageTx = async () => {
    const data = await callBlockTxPage(page, limit, params.blockNumber);
    setTxList(data.data.data);
    setLatestTxNum(data.data.data.length);
  };

  useEffect(() => {
    setMaxPageFunc();
  }, [limit, latestTxNum]);

  useEffect(() => {
    getPageTx();
  }, [page, limit]);

  return (
    <BlockTxsComp
      txList={txList}
      shortWords={shortWords}
      latestTxNum={latestTxNum}
      page={page}
      limit={limit}
      nextPage={nextPage}
      prevPage={prevPage}
      maxPage={maxPage}
      handleSelect={handleSelect}
      moveToTxInfo={moveToTxInfo}
      params={params.blockNumber}
      moveToBlockInfo={moveToBlockInfo}
      moveToAddress={moveToAddress}
      moveHome={moveHome}
    ></BlockTxsComp>
  );
};

export default BlockTxsContainer;
