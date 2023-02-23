import { useNavigate } from "react-router-dom";
import HeaderComp from "./Component";

const HeaderContainer = () => {
  const navigate = useNavigate();

  const moveTo = () => {
    navigate("/");
  };
  return <HeaderComp moveTo={moveTo}></HeaderComp>;
};

export default HeaderContainer;
