import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { callLatestTx, callTxPage } from "../../api";
import AllTxComp from "./Component";

const AllTxsContainer = () => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [txList, setTxList] = useState();
  const [latestTxNum, setLatestTxNum] = useState();
  const navigate = useNavigate();

  const moveToTxInfo = (txHash) => {
    navigate(`/txinfo/${txHash}`);
  };

  const moveToAddress = (address) => {
    navigate(`/address/${address}`);
  };
  const handleSelect = (e) => {
    setLimit(+e.target.value);
    setPage(1);
  };
  const moveBlockInfo = (params) => {
    navigate(`/blockInfo/${params}`);
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

  const getLatestTx = async () => {
    const data = await callLatestTx();
    setLatestTxNum(data.data.data.id);
  };

  const getPageTx = async () => {
    const data = await callTxPage(page, limit);
    setTxList(data.data.data);
  };

  useEffect(() => {
    setMaxPageFunc();
  }, [limit, latestTxNum]);

  useEffect(() => {
    getPageTx();
  }, [page, limit]);

  useEffect(() => {
    getLatestTx();
  }, []);

  return (
    <AllTxComp
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
      moveToAddress={moveToAddress}
      moveBlockInfo={moveBlockInfo}
    ></AllTxComp>
  );
};

export default AllTxsContainer;
