import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../store/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = ()=>useDispatch<typeof store.dispatch>();