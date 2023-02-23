import styled from "styled-components";

const FooterComp = ({}) => {
  return (
    <FooterLine>
      <ContentsBox>
        <HighBox>
          <LogoBox>
            <img src="/imgs/opti-logo.svg" />
            Powered by Polygon Chain
          </LogoBox>
          <BtnBox>
            <div>
              <img src="/imgs/metamask.svg" />
              <div>Add OP Network</div>
            </div>
            <div>
              <img src="/imgs/setting.svg" />
              <div>Preferences</div>
            </div>
          </BtnBox>
        </HighBox>
      </ContentsBox>
      <Line></Line>
      <ContentsBox>
        <LowBox>
          <TextBox>
            <div>Etherscan © 2020 (OP-B1)</div>
            <div>⛏ Built by the same team behind</div>
            <div>Etherscan</div>
          </TextBox>
          <ServiceBox>
            <div>Terms of Service</div>
            <div>Network Status</div>
            <div>
              <img src="/imgs/mail.svg"></img>
            </div>
          </ServiceBox>
        </LowBox>
      </ContentsBox>
    </FooterLine>
  );
};

export default FooterComp;

const ServiceBox = styled.div`
  display: flex;
  color: white;
  font-size: 0.8rem;

  img {
    width: 14px;
  }

  div {
    margin: 0 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  & > div:last-child {
    background-color: gray;
    border-radius: 28px;
    width: 28px;
    height: 28px;
    cursor: pointer;
    display: flex;
    justify-content: center;

    &:hover {
      background-color: white;
    }
  }
`;

const FooterLine = styled.div`
  background-image: url(/imgs/background.svg);
  background-color: #21325b;

  width: 100%;
`;

const ContentsBox = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: auto;
  padding: 10px 0;
`;

const HighBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
  color: white;

  img {
    width: 30px;
    margin-right: 10px;
  }
`;

const LowBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
  align-items: center;
`;

const TextBox = styled.div`
  display: flex;
  color: white;
  font-size: 0.8rem;

  div {
    margin-right: 5px;
  }

  & > div:first-child {
    border-right: 1px solid gray;
    padding-right: 5px;
  }

  & > div:last-child {
    color: blue;
    cursor: pointer;
  }
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
`;
const BtnBox = styled.div`
  display: flex;
  font-size: 0.8rem;
  & > div {
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-left: 10px;
    background-color: #39466b;
    padding: 0 5px;
    cursor: pointer;

    &:hover {
      background-color: white;
      color: black;
    }
    img {
      width: 20px;
      margin-right: 5px;
    }
  }
`;

const Line = styled.div`
  border-bottom: 1px solid gray;
  max-width: 1400px;
  margin: 20px auto 0 auto;
`;
