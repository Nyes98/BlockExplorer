import BlockInfoContainer from "./components/blockInfo/Container";
import FooterContainer from "./components/footer/Container";
import HeaderContainer from "./components/header/Container";
import MainContainer from "./components/main/Container";
import { Route, Routes, Link } from "react-router-dom";
import TxInfoContainer from "./components/txInfo/Container";
import AllBlocksContainer from "./components/allBlocks/Container";
import AllTxsContainer from "./components/allTxs/Container";
import AddressContainer from "./components/address/Container";
import BlockTxsContainer from "./components/blockTxs/Container";

function App() {
  return (
    <div className="App">
      <HeaderContainer></HeaderContainer>

      <Routes>
        <Route path="/" element={<MainContainer></MainContainer>}></Route>
        <Route
          path="/blockInfo/:blockNumber"
          element={<BlockInfoContainer></BlockInfoContainer>}
        ></Route>
        <Route
          path="/txInfo/:txHash"
          element={<TxInfoContainer></TxInfoContainer>}
        ></Route>
        <Route
          path="/allBlocks"
          element={<AllBlocksContainer></AllBlocksContainer>}
        ></Route>
        <Route
          path="/allTxs"
          element={<AllTxsContainer></AllTxsContainer>}
        ></Route>
        <Route
          path="/address/:address"
          element={<AddressContainer></AddressContainer>}
        ></Route>
        <Route
          path="/blockTxs/:blockNumber"
          element={<BlockTxsContainer></BlockTxsContainer>}
        ></Route>
      </Routes>
      <FooterContainer></FooterContainer>
    </div>
  );
}

export default App;
