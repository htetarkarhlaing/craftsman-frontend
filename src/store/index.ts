import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import stageReducer from "./reducers/stage.reducer";
import containerReducer from "./reducers/container.reducer";
import actionReducer from "./reducers/action.reducer";

const store = configureStore({
	reducer: {
		stage: stageReducer,
		container: containerReducer,
		action: actionReducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({ serializableCheck: false });
	},
	devTools: true,
});
const { dispatch } = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { dispatch };
export default store;
