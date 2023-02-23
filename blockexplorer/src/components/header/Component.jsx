import styled from "styled-components";

const HeaderComp = ({ moveTo }) => {
  return (
    <HeaderLine>
      <ContentsBox>
        <LogoBox onClick={moveTo}>
          <img src="/imgs/logo-ether.svg"></img>{" "}
        </LogoBox>
        <DropContents>
          <div onClick={moveTo}>Home</div>
          <div>Blockchain</div>
          <div>Tokens</div>
          <div>Misc</div>
        </DropContents>
      </ContentsBox>
    </HeaderLine>
  );
};

export default HeaderComp;

const HeaderLine = styled.div`
  max-width: 1400px;
  margin: auto;
`;
const LogoBox = styled.div`
  cursor: pointer;
  img {
    width: 150px;
    margin: 10px 0;
  }
`;
const ContentsBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: auto;
`;

const DropContents = styled.div`
  display: flex;
  div {
    padding: 17px 15px;
  }

  div:first-child {
    cursor: pointer;
  }
`;
