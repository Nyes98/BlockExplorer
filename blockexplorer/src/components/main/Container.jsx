import { useEffect, useState } from "react";
import { callAllBlock, callRecentBlock, mainSearch } from "../../api";
import { useNavigate } from "react-router-dom";

import MainComp from "./Component";
import { useDispatch, useSelector } from "react-redux";
import { action } from "../../modules/button";

const MainContainer = () => {
  const [blockInfo, setBlockInfo] = useState([]);
  const [txInfo, setTxInfo] = useState([]);
  const [search, setSearch] = useState();
  const [latestBlock, setLatestBlock] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMordal = useSelector((state) => state.button.value);

  const moveToAddress = (address) => {
    navigate(`/address/${address}`);
  };

  const moveBlockInfo = (params) => {
    navigate(`/blockInfo/${params}`);
  };

  const moveTransactionInfo = (params) => {
    navigate(`/txInfo/${params}`);
  };

  const moveAllBlockInfo = () => {
    navigate(`/allBlocks`);
  };

  const moveAllTxInfo = () => {
    navigate(`/allTxs`);
  };

  const moveBlockTxns = (blockNumber) => {
    navigate(`/blockTxs/${blockNumber}`);
  };

  const enter = (e) => {
    if (e.key === "Enter") {
      doSearch();
    }
  };

  const doSearch = async () => {
    if (!search) {
      dispatch(action.openMordal());
      return;
    }
    const searchData = await mainSearch(search);

    if (searchData.data.data.blockNumber)
      navigate(`/blockInfo/${searchData.data.data.blockNumber}`);
    else if (searchData.data.data.address)
      navigate(`/address/${searchData.data.data.address}`);
    else if (searchData.data.data.txHash)
      navigate(`/txInfo/${searchData.data.data.txHash}`);
    else {
      dispatch(action.openMordal());
    }
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

  const veryshortWords = (str, length = 15) => {
    let result = "";
    if (str.length > length) {
      result = str.substr(0, length - 2) + "...";
    } else {
      result = str;
    }
    return result;
  };

  const getAllBlock = async () => {
    const result = await callAllBlock();
  };

  const getRecentBlock = async () => {
    const result = await callRecentBlock();
    setBlockInfo(result.data.data);
    setTxInfo(result.data.trans);
    setLatestBlock(result.data.data[0].number);
  };

  useEffect(() => {
    getRecentBlock();
    getAllBlock();
  }, []);

  return (
    <MainComp
      blockInfo={blockInfo}
      txInfo={txInfo}
      shortWords={shortWords}
      veryshortWords={veryshortWords}
      moveBlockInfo={moveBlockInfo}
      moveTransactionInfo={moveTransactionInfo}
      moveAllBlockInfo={moveAllBlockInfo}
      moveAllTxInfo={moveAllTxInfo}
      moveToAddress={moveToAddress}
      moveBlockTxns={moveBlockTxns}
      setSearch={setSearch}
      doSearch={doSearch}
      errorMordal={errorMordal}
      enter={enter}
    ></MainComp>
  );
};

export default MainContainer;
