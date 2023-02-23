import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { callTxInfo, callBlockInfo } from "../../api";
import TxInfoComp from "./Component";

const TxInfoContainer = () => {
  const [txInfo, setTxInfo] = useState();
  const [ts, setTs] = useState();
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [day, setDay] = useState(0);
  const params = useParams();
  const navigate = useNavigate();

  const getTxInfo = async () => {
    const result = await callTxInfo(params.txHash);
    setTxInfo(result.data.data);

    let agoDate = parseInt(
      Date.now() - +result.data.data.Block.timestamp * 1000
    );

    setSecond(parseInt(agoDate / 1000) % 60);
    setMinute(parseInt(agoDate / (60 * 1000)) % 60);
    setHour(parseInt(agoDate / (60 * 1000 * 60)) % 24);
    setDay(parseInt(agoDate / (60 * 1000 * 60 * 24)));

    let idate = new Date(+result.data.data.Block.timestamp * 1000);
    setTs(idate.toString());
  };

  const moveTo = (blockNumber) => {
    navigate(`/blockInfo/${blockNumber}`);
  };

  const moveToAddress = (address) => {
    navigate(`/address/${address}`);
  };

  useEffect(() => {
    getTxInfo();
  }, [params.txHash]);

  return (
    <TxInfoComp
      txInfo={txInfo}
      ts={ts}
      second={second}
      minute={minute}
      hour={hour}
      day={day}
      moveTo={moveTo}
      moveToAddress={moveToAddress}
      // nextBlock={nextBlock}
      // prevBlock={prevBlock}
    ></TxInfoComp>
  );
};

export default TxInfoContainer;
