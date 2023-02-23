import styled from "styled-components";

const BlockInfoComp = ({
  blockInfo,
  ts,
  second,
  minute,
  hour,
  day,
  nextBlock,
  prevBlock,
  moveBlockTxns,
}) => {
  return (
    <Background>
      <TitleBox>
        <div>Block</div>
        <div>#{blockInfo?.number}</div>
      </TitleBox>
      <ContentsBox>
        <InfoWrap>
          <InfoParagraph>
            <InfoBox>
              <InfoTitle>Block Height:</InfoTitle>
              <InfoContents>
                {blockInfo?.number}
                <button onClick={prevBlock}>&lt;</button>
                <button onClick={nextBlock}>&gt;</button>
              </InfoContents>
            </InfoBox>
            <InfoBox>
              <InfoTitle>Timestamp:</InfoTitle>
              {day ? (
                <InfoContents>
                  🕑{day} days ago ({ts})
                </InfoContents>
              ) : hour ? (
                <InfoContents>
                  🕑{hour} hours {minute} minutes ago ({ts})
                </InfoContents>
              ) : minute ? (
                <InfoContents>
                  🕑{minute} minutes {second} seconds ago ({ts})
                </InfoContents>
              ) : (
                <InfoContents>
                  {second} seconds ago ({ts})
                </InfoContents>
              )}
            </InfoBox>
            <InfoBox>
              <InfoTitle>Transactions:</InfoTitle>
              <InfoContents>
                <div
                  onClick={() => {
                    moveBlockTxns(blockInfo?.number);
                  }}
                >
                  {blockInfo?.transactions.length} transactions
                </div>
                in this block
              </InfoContents>
            </InfoBox>
          </InfoParagraph>
          <InfoParagraph>
            <InfoBox>
              <InfoTitle>Total Difficulty:</InfoTitle>
              <InfoContents>
                {(+blockInfo?.totalDifficulty).toLocaleString()}
              </InfoContents>
            </InfoBox>
            <InfoBox>
              <InfoTitle>Size:</InfoTitle>
              <InfoContents>
                {(+blockInfo?.size).toLocaleString()} bytes
              </InfoContents>
            </InfoBox>
          </InfoParagraph>
          <InfoParagraph>
            <InfoBox>
              <InfoTitle>Gas Used:</InfoTitle>
              <InfoContents>
                {blockInfo?.gasUsed}(
                {((blockInfo?.gasUsed / blockInfo?.gasLimit) * 100).toFixed(2)}
                %)
              </InfoContents>
            </InfoBox>
            <InfoBox>
              <InfoTitle>Gas Limit:</InfoTitle>
              <InfoContents>
                {(+blockInfo?.gasLimit).toLocaleString()}
              </InfoContents>
            </InfoBox>
          </InfoParagraph>
          <InfoParagraph>
            <InfoBox>
              <InfoTitle>Hash:</InfoTitle>
              <InfoContents>{blockInfo?.hash}</InfoContents>
            </InfoBox>
            <InfoBox>
              <InfoTitle>Parent Hash:</InfoTitle>
              <InfoContents>{blockInfo?.parentHash}</InfoContents>
            </InfoBox>
            <InfoBox>
              <InfoTitle>State Root:</InfoTitle>
              <InfoContents>{blockInfo?.stateRoot}</InfoContents>
            </InfoBox>
            <InfoBox>
              <InfoTitle>Nonce:</InfoTitle>
              <InfoContents>{blockInfo?.nonce}</InfoContents>
            </InfoBox>
          </InfoParagraph>
        </InfoWrap>
      </ContentsBox>
    </Background>
  );
};

export default BlockInfoComp;

const InfoParagraph = styled.div`
  border-bottom: 1px solid lightgray;
  /* margin-bottom: 10px; */
  width: 98%;
  margin: 10px auto;

  &:last-child {
    border-bottom: none;
  }
`;
const InfoWrap = styled.div`
  width: 100%;
  border: 1px solid gray;
  border-radius: 10px;
`;

const ContentsBox = styled.div`
  margin: auto;
  border-radius: 10px;
  max-width: 1400px;
  background-color: white;
`;

const TitleBox = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: auto;
  display: flex;
  padding: 20px 0;

  & > div:first-child {
    font-size: 1.2rem;
    font-weight: 600;
    margin-right: 10px;
  }

  & > div:last-child {
    font-size: 1rem;
    color: gray;
    margin-top: 3px;
  }
`;

const InfoBox = styled.div`
  font-size: 1rem;
  display: flex;
  width: 100%;
  padding: 10px;
`;

const InfoTitle = styled.div`
  color: gray;
  width: 25%;
`;

const InfoContents = styled.div`
  width: 75%;
  display: flex;

  div {
    margin-right: 5px;
    color: blue;
    cursor: pointer;
  }

  button {
    border: none;
    border-radius: 5px;
    padding: 5px 8px;
    margin-left: 3px;
    cursor: pointer;
  }
`;

const Background = styled.div`
  background-color: lightgray;
  padding-bottom: 50px;
`;
