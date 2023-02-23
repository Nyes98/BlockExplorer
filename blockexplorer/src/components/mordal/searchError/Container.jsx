import { useDispatch } from "react-redux";
import { action } from "../../../modules/button";
import SearchErrorMordalComp from "./Component";

const SearchErrorMordalContainer = ({}) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(action.closeMordal());
  };
  return <SearchErrorMordalComp onClick={onClick}></SearchErrorMordalComp>;
};

export default SearchErrorMordalContainer;
