import styled from "styled-components";

const SearchErrorMordalComp = ({ onClick }) => {
  return (
    <>
      <Background onClick={onClick}></Background>
      <Mordal>
        <Title>
          Search not found
          <button onClick={onClick}>x</button>
        </Title>
        <Contents>Oops! You have entered an wrong search string</Contents>
        <Contents>Please re-enter the correct value</Contents>
      </Mordal>
    </>
  );
};

export default SearchErrorMordalComp;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Title = styled.div`
  padding: 20px;
  font-size: 1.2rem;
  font-weight: 800;
  border-bottom: 1px solid lightgray;

  button {
    position: absolute;
    right: 5px;
    top: 5px;
    border: none;
    padding: 3px 8px;
    background-color: red;
    color: white;
  }
`;
const Contents = styled.div`
  padding: 10px 20px 0 20px;
  font-size: 1rem;
`;

const Mordal = styled.div`
  z-index: 1;

  position: fixed;
  border: 1px solid gray;
  border-radius: 10px;
  width: 400px;
  height: 200px;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
`;
