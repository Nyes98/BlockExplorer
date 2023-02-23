import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  callAddressLatestTx,
  callAddressPage,
  callLatestTx,
  callTxPage,
} from "../../api";
import AddressComp from "./Component";
import AllTxComp from "./Component";

const AddressContainer = () => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [txList, setTxList] = useState();
  const [latestTxNum, setLatestTxNum] = useState();
  const navigate = useNavigate();
  const params = useParams();

  const moveToTxInfo = (txHash) => {
    navigate(`/txinfo/${txHash}`);
  };

  const moveHome = () => {
    navigate("/");
  };

  const moveToAddress = (address) => {
    navigate(`/address/${address}`);
  };

  const moveToBlock = (blockNumber) => {
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

  const getLatestTx = async () => {
    const data = await callAddressLatestTx(params);
    setLatestTxNum(data.data.data.length);
  };

  const getPageTx = async () => {
    const data = await callAddressPage(params.address, page, limit);
    setTxList(data.data.data);
  };

  useEffect(() => {
    setMaxPageFunc();
  }, [limit, latestTxNum, params]);

  useEffect(() => {
    getPageTx();
  }, [page, limit, params]);

  useEffect(() => {
    getLatestTx();
  }, [params]);

  return (
    <AddressComp
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
      moveHome={moveHome}
      moveToBlock={moveToBlock}
      moveToAddress={moveToAddress}
      params={params.address}
    ></AddressComp>
  );
};

export default AddressContainer;
