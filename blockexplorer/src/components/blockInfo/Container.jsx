import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { callBlockInfo, callLatestBlock } from "../../api";
import BlockInfoComp from "./Component";

const BlockInfoContainer = () => {
  const [blockInfo, setBlockInfo] = useState();
  const [ts, setTs] = useState();
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [day, setDay] = useState(0);
  const [latestBlockNum, setLatestBlockNum] = useState();
  const params = useParams();
  const navigate = useNavigate();

  const moveBlockTxns = (blockNumber) => {
    navigate(`/blockTxs/${blockNumber}`);
  };

  const getBlockInfo = async () => {
    const result = await callBlockInfo(params.blockNumber);
    setBlockInfo(result.data.data);

    let agoDate = parseInt(Date.now() - +result.data.data.timestamp * 1000);
    console.log(result.data.data.timestamp * 1000);
    console.log(Date.now());
    console.log(
      (Date.now() - result.data.data.timestamp * 1000) / 1000 / 60 / 60 / 24
    );
    setSecond(parseInt(agoDate / 1000) % 60);
    setMinute(parseInt(agoDate / (60 * 1000)) % 60);
    setHour(parseInt(agoDate / (60 * 1000 * 60)) % 24);
    setDay(parseInt(agoDate / (60 * 1000 * 60 * 24)));

    let idate = new Date(+result.data.data.timestamp * 1000);
    setTs(idate.toString());
  };

  const getLatestBlock = async () => {
    const data = await callLatestBlock();
    setLatestBlockNum(data.data.data.id);
  };
  getLatestBlock();

  const nextBlock = () => {
    if (params.blockNumber == latestBlockNum - 1) return;
    navigate(`/blockInfo/${+params.blockNumber + 1}`);
  };

  const prevBlock = () => {
    if (params.blockNumber == 0) return;

    navigate(`/blockInfo/${+params.blockNumber - 1}`);
  };

  useEffect(() => {
    getBlockInfo();
  }, [params.blockNumber]);

  return (
    <BlockInfoComp
      blockInfo={blockInfo}
      ts={ts}
      second={second}
      minute={minute}
      hour={hour}
      day={day}
      nextBlock={nextBlock}
      prevBlock={prevBlock}
      moveBlockTxns={moveBlockTxns}
    ></BlockInfoComp>
  );
};

export default BlockInfoContainer;
