import { useSelector } from "react-redux";
import styled from "styled-components";
import SearchErrorMordalContainer from "../mordal/searchError/Container";

const MainComp = ({
  blockInfo,
  shortWords,
  txInfo,
  veryshortWords,
  moveBlockInfo,
  moveTransactionInfo,
  moveAllBlockInfo,
  moveAllTxInfo,
  moveToAddress,
  moveBlockTxns,
  setSearch,
  doSearch,
  errorMordal,
  setErrorMordal,
  enter,
}) => {
  return (
    <MainRoot>
      {errorMordal ? (
        <SearchErrorMordalContainer
          setErrorMordal={setErrorMordal}
        ></SearchErrorMordalContainer>
      ) : (
        <></>
      )}
      <MainBackgroud></MainBackgroud>

      <ContentsBox>
        <SearchBox>
          <div>The Optimism Explorer</div>
          <SearchLine>
            <input
              type="text"
              placeholder="Search by Address / Txn Hash / Block"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyPress={enter}
            />
            <SearchBtnBox
              onClick={() => {
                doSearch();
              }}
            >
              <img src="/imgs/search.svg" alt="" />
            </SearchBtnBox>
          </SearchLine>
        </SearchBox>
        <InfoViewBox>
          <LatestBlocksBox>
            <InfoTitleBox>Latest Blocks</InfoTitleBox>
            {blockInfo?.map((item, index) => (
              <InfoContentsBox key={`InfoContentsBox-${index}`}>
                <BlockHeight>
                  <Icon>BK</Icon>
                  <HeightTime>
                    <div
                      onClick={() => {
                        moveBlockInfo(item.number);
                      }}
                    >
                      {item.number}
                    </div>
                    {parseInt(
                      (Date.now() - item.timestamp * 1000) /
                        (1000 * 60 * 60 * 24)
                    ) > 0 ? (
                      <div>
                        {parseInt(
                          (Date.now() - item.timestamp * 1000) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days{" "}
                        {parseInt(
                          (Date.now() - item.timestamp * 1000) /
                            (1000 * 60 * 60)
                        ) % 24}{" "}
                        hours ago
                      </div>
                    ) : parseInt(
                        (Date.now() - item.timestamp * 1000) / (1000 * 60 * 60)
                      ) > 0 ? (
                      <div>
                        {parseInt(
                          (Date.now() - item.timestamp * 1000) /
                            (1000 * 60 * 60)
                        )}{" "}
                        hours{" "}
                        {parseInt(
                          (Date.now() - item.timestamp * 1000) / (1000 * 60)
                        ) % 60}{" "}
                        minutes ago
                      </div>
                    ) : (
                      <div>
                        {parseInt(
                          (Date.now() - item.timestamp * 1000) / (1000 * 60)
                        )}{" "}
                        minutes{" "}
                        {parseInt((Date.now() - item.timestamp * 1000) / 1000) %
                          60}{" "}
                        seconds ago
                      </div>
                    )}
                  </HeightTime>
                </BlockHeight>
                <ValidInfo>
                  <MinerBox>
                    <div>Validated By</div>
                    <div
                      onClick={() => {
                        moveToAddress(item.miner);
                      }}
                    >
                      {shortWords(item.miner)}
                    </div>
                  </MinerBox>
                  <TxnsTime>
                    <div
                      onClick={() => {
                        moveBlockTxns(item.number);
                      }}
                    >
                      {item.transactions.length} txns
                    </div>
                  </TxnsTime>
                </ValidInfo>
                <GasInfo>
                  <div>UsedGas</div>
                  <div>{item.gasUsed}</div>
                </GasInfo>
              </InfoContentsBox>
            ))}

            <InfoBtnBox>
              <div onClick={moveAllBlockInfo}>Veiw All</div>
            </InfoBtnBox>
          </LatestBlocksBox>
          <LatestTransactionsBox>
            <InfoTitleBox>Latest Transactions</InfoTitleBox>
            {txInfo?.map((item, index) => (
              <InfoContentsBox key={`TInfoContentsBox-${index}`}>
                <BlockHeight>
                  <Ticon>Tx</Ticon>
                  <HeightTime>
                    <div
                      onClick={() => {
                        moveTransactionInfo(item.hash);
                      }}
                    >
                      {veryshortWords(item.hash)}
                    </div>

                    {parseInt(
                      (Date.now() - item.Block.timestamp * 1000) /
                        (1000 * 60 * 60 * 24)
                    ) > 0 ? (
                      <div>
                        {parseInt(
                          (Date.now() - item.Block.timestamp * 1000) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days{" "}
                        {parseInt(
                          (Date.now() - item.Block.timestamp * 1000) /
                            (1000 * 60 * 60)
                        ) % 24}{" "}
                        hours ago
                      </div>
                    ) : parseInt(
                        (Date.now() - item.Block.timestamp * 1000) /
                          (1000 * 60 * 60)
                      ) > 0 ? (
                      <div>
                        {parseInt(
                          (Date.now() - item.Block.timestamp * 1000) /
                            (1000 * 60 * 60)
                        )}{" "}
                        hours{" "}
                        {parseInt(
                          (Date.now() - item.Block.timestamp * 1000) /
                            (1000 * 60)
                        ) % 60}{" "}
                        minutes ago
                      </div>
                    ) : (
                      <div>
                        {parseInt(
                          (Date.now() - item.Block.timestamp * 1000) /
                            (1000 * 60)
                        )}{" "}
                        minutes{" "}
                        {parseInt(
                          (Date.now() - item.Block.timestamp * 1000) / 1000
                        ) % 60}{" "}
                        seconds ago
                      </div>
                    )}
                  </HeightTime>
                </BlockHeight>
                <ValidInfo>
                  <MinerBox>
                    <div>From</div>
                    <div
                      onClick={() => {
                        moveToAddress(item.from);
                      }}
                    >
                      {shortWords(item.from)}
                    </div>
                  </MinerBox>
                  <MinerBox>
                    <div>To</div>
                    <div
                      onClick={() => {
                        moveToAddress(item.to);
                      }}
                    >
                      {shortWords(item.to)}
                    </div>
                  </MinerBox>
                </ValidInfo>
                <ValueInfo>
                  <div>{item.value / Math.pow(10, 18)}</div>
                  <div>ETH</div>
                </ValueInfo>
              </InfoContentsBox>
            ))}

            <InfoBtnBox>
              <div onClick={moveAllTxInfo}>Veiw All</div>
            </InfoBtnBox>
          </LatestTransactionsBox>
        </InfoViewBox>
      </ContentsBox>
    </MainRoot>
  );
};

export default MainComp;

const MainRoot = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
`;

const MainBackgroud = styled.div`
  position: absolute;
  top: 0;
  background-color: #21325b;
  padding: 9rem 0;
  z-index: -1;
  width: 100%;
  background-image: url(/imgs/background.svg);
`;

const ContentsBox = styled.div`
  max-width: 1400px;
  width: 100%;
  margin-top: 100px;
`;

const SearchBox = styled.div`
  font-size: 21px;
  color: white;
  width: 40%;
`;

const SearchBtnBox = styled.div`
  display: flex;
  justify-content: center;
  background-color: #8247e5;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  cursor: pointer;
  img {
    width: 20px;
    filter: invert(100%) sepia(82%) saturate(48%) hue-rotate(229deg)
      brightness(114%) contrast(100%);
  }
`;

const ValueInfo = styled.div`
  margin-top: 10px;
  width: 50px;
  height: 25px;
  background-color: #f1f2f4;
  display: flex;
  justify-content: center;
  font-weight: 500;
  color: gray;

  & > div:nth-child(2) {
    font-size: 12px;
    margin-top: 4px;
  }
`;

const SearchLine = styled.div`
  z-index: 2;
  display: flex;
  width: 100%;
  input {
    width: 90%;
    border-radius: 10px;
  }
  input:focus {
    outline: none;
  }
`;

const InfoViewBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LatestBlocksBox = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 48%;
  margin-top: 50px;
  border: 1px solid #e7eaf3;
`;
const LatestTransactionsBox = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 48%;
  margin-top: 50px;
  border: 1px solid #e7eaf3;
`;

const InfoTitleBox = styled.div`
  border-bottom: 1px solid #e7eaf3;
  font-weight: 700;
  padding: 10px;
`;
const InfoContentsBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #e7eaf3;
`;
const InfoBtnBox = styled.div`
  border-top: 1px solid #e7eaf3;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95%;
    background-color: #f2ecfc;
    margin: 10px auto;
    border-radius: 10px;
    height: 25px;
    font-size: 11px;
    color: #8247e5;
    cursor: pointer;
  }
`;

const BlockHeight = styled.div`
  display: flex;
`;
const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background-color: #f1f2f4;
  margin-right: 5px;
`;

const Ticon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: #f1f2f4;
  margin-right: 5px;
`;
const HeightTime = styled.div`
  margin-top: 3px;
  & > div:first-child {
    color: #8247e7;
    cursor: pointer;
  }

  & > div:nth-child(2) {
    font-size: 11px;
    color: gray;
  }
`;

const ValidInfo = styled.div``;
const MinerBox = styled.div`
  display: flex;
  & > :first-child {
    margin-right: 5px;
  }
  & > :nth-child(2) {
    color: #8247e7;
    cursor: pointer;
  }
`;
const TxnsTime = styled.div`
  display: flex;
  & > :first-child {
    margin-right: 5px;
    color: #8247e7;
    cursor: pointer;
  }
  & > :nth-child(2) {
    font-size: 11px;
    color: gray;
    margin-top: 5px;
  }
`;

const GasInfo = styled.div`
  & > :nth-child(2) {
    color: #8247e7;
  }
`;
