import styled from "styled-components";

const TxInfoComp = ({
  txInfo,
  ts,
  second,
  minute,
  hour,
  day,
  nextBlock,
  prevBlock,
  moveTo,
  moveToAddress,
}) => {
  return (
    <Background>
      <TitleBox>
        <div>Transaction Details</div>
      </TitleBox>
      <ContentsBox>
        <InfoWrap>
          <InfoParagraph>
            <InfoBox>
              <InfoTitle>Transaction Hash:</InfoTitle>
              <InfoContents>{txInfo?.hash}</InfoContents>
            </InfoBox>
            <InfoBox>
              <InfoTitle>Block:</InfoTitle>
              <InfoContents>
                <div
                  onClick={() => {
                    moveTo(txInfo?.BlockNumber);
                  }}
                >
                  ⌛{txInfo?.BlockNumber}
                </div>
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
          </InfoParagraph>
          <InfoParagraph>
            <InfoBox>
              <InfoTitle>From:</InfoTitle>
              <InfoContents
                onClick={() => {
                  moveToAddress(txInfo.from);
                }}
              >
                <div>{txInfo?.from}</div>
              </InfoContents>
            </InfoBox>
            <InfoBox>
              <InfoTitle>To:</InfoTitle>
              <InfoContents
                onClick={() => {
                  moveToAddress(txInfo.to);
                }}
              >
                <div>{txInfo?.to}</div>
              </InfoContents>
            </InfoBox>
          </InfoParagraph>
          <InfoParagraph>
            <InfoBox>
              <InfoTitle>Value:</InfoTitle>
              <InfoContents>
                {txInfo?.value / Math.pow(10, 18)} ETH
              </InfoContents>
            </InfoBox>
            <InfoBox>
              <InfoTitle>Gas:</InfoTitle>
              <InfoContents>
                {(+txInfo?.gas / Math.pow(10, 18)).toFixed(15)} ETH
              </InfoContents>
            </InfoBox>
            <InfoBox>
              <InfoTitle>Gas Price:</InfoTitle>
              <InfoContents>
                {(+txInfo?.gasPrice / Math.pow(10, 18)).toFixed(9)} ETH
              </InfoContents>
            </InfoBox>
          </InfoParagraph>
        </InfoWrap>
      </ContentsBox>
    </Background>
  );
};

export default TxInfoComp;

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
  }
`;

const Background = styled.div`
  background-color: lightgray;
  padding-bottom: 50px;
`;
