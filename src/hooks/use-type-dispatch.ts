import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store/store";

export const useTypeDispatch = () => useDispatch<AppDispatch>();