import { useDispatch, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "../app/Store/store";
import { useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;