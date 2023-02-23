import styled from "styled-components";

const AllTxComp = ({
  txList,
  shortWords,
  latestTxNum,
  page,
  limit,
  nextPage,
  prevPage,
  maxPage,
  handleSelect,
  moveToTxInfo,
  moveToAddress,
  moveBlockInfo,
}) => {
  return (
    <Background>
      <TitleBox>
        <div>Transactions</div>
      </TitleBox>
      <SubBox>
        <NumBox>
          <div>Total of {latestTxNum} Transactions</div>
          <div>
            (Showing Transactions between #
            {latestTxNum - page * limit > -1 ? latestTxNum - page * limit : 0}{" "}
            to #{latestTxNum - (page - 1) * limit - 1})
          </div>
        </NumBox>
        <PageBox>
          <div>
            Show rows:
            <select onChange={handleSelect} value={limit}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div onClick={prevPage}>&lt;</div>
          <div>
            Page {page} of {maxPage}
          </div>
          <div onClick={nextPage}>&gt;</div>
        </PageBox>
      </SubBox>
      <ContentsBox>
        <TitleLine>
          <tr>
            <th>Txn Hash</th>
            <th>Block</th>
            <th>Age</th>
            <th>From</th>
            <th>To</th>
            <th>Gas Price</th>
            <th>Value</th>
          </tr>
        </TitleLine>
        {txList?.map((item, index) => (
          <InfoLine key={`txInfoLine-${index}`}>
            <tr>
              <td
                onClick={() => {
                  moveToTxInfo(item.hash);
                }}
              >
                {shortWords(item.hash)}
              </td>

              <td
                onClick={() => {
                  moveBlockInfo(item.BlockNumber);
                }}
              >
                {item.BlockNumber}
              </td>

              {parseInt(
                (Date.now() - item.Block.timestamp * 1000) /
                  (1000 * 60 * 60 * 24)
              ) > 0 ? (
                <td>
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
                </td>
              ) : parseInt(
                  (Date.now() - item.Block.timestamp * 1000) / (1000 * 60 * 60)
                ) > 0 ? (
                <td>
                  {parseInt(
                    (Date.now() - item.Block.timestamp * 1000) /
                      (1000 * 60 * 60)
                  )}{" "}
                  hours{" "}
                  {parseInt(
                    (Date.now() - item.Block.timestamp * 1000) / (1000 * 60)
                  ) % 60}{" "}
                  minutes ago
                </td>
              ) : (
                <td>
                  {parseInt(
                    (Date.now() - item.Block.timestamp * 1000) / (1000 * 60)
                  )}{" "}
                  minutes{" "}
                  {parseInt((Date.now() - item.Block.timestamp * 1000) / 1000) %
                    60}{" "}
                  seconds ago
                </td>
              )}
              <td
                onClick={() => {
                  moveToAddress(item.from);
                }}
              >
                {shortWords(item.from)}
              </td>
              <td
                onClick={() => {
                  moveToAddress(item.to);
                }}
              >
                {shortWords(item.to)}
              </td>
              <td>
                {(+item.gasPrice / Math.pow(10, 9)).toLocaleString()} Gwei
              </td>
              <td>{+item.value / Math.pow(10, 18)} ETH</td>
            </tr>
          </InfoLine>
        ))}
      </ContentsBox>
    </Background>
  );
};

export default AllTxComp;

const SubBox = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1400px;
  margin: auto;
  margin-top: 20px;
`;

const PageBox = styled.div`
  display: flex;
  align-items: center;

  select {
    border: none;
    margin-top: 4px;
  }

  div {
    display: flex;
    align-items: center;
    border: 1px solid gray;
    border-radius: 5px;
    background-color: white;
    padding: 3px 5px 5px 5px;
    margin: 3px;
  }
`;

const TitleLine = styled.thead`
  text-align: left;
  border-bottom: 1px solid gray;
`;

const InfoLine = styled.tbody`
  border-bottom: 1px solid lightgray;
  padding: 20px 0;

  & > tr > td:first-child {
    color: blue;
    cursor: pointer;
  }
  & > tr > td:nth-child(2) {
    color: blue;
    cursor: pointer;
  }
  & > tr > td:nth-child(4) {
    color: blue;
    cursor: pointer;
  }
  & > tr > td:nth-child(5) {
    color: blue;
    cursor: pointer;
  }
`;

const Background = styled.div`
  background-color: lightgray;
  padding-bottom: 50px;
`;

const ContentsBox = styled.table`
  margin: 30px auto;
  border: 1px solid gray;

  border-radius: 10px;
  border-collapse: collapse;
  border-style: hidden;
  box-shadow: 0 0 0 1px #000;
  max-width: 1400px;
  width: 100%;
  background-color: white;

  th,
  td {
    padding: 10px;
  }
`;

const TitleBox = styled.div`
  max-width: 1400px;
  margin: auto;
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid gray;

  & > div:first-child {
    font-size: 1.2rem;
    font-weight: 600;
    margin-right: 10px;
  }
`;

const NumBox = styled.div`
  & > div:nth-child(2) {
    font-size: 0.9rem;
    color: gray;
  }
`;
