import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IStageState {
	value: "LAYOUT" | "ACTION";
}

const initialState: IStageState = {
	value: "LAYOUT",
};

export const stageSlice = createSlice({
	name: "stage",
	initialState,
	reducers: {
		changeStage: (state, action: PayloadAction<"LAYOUT" | "ACTION">) => {
			const stage = action.payload;
			state.value = stage;
		},
	},
});

export const { changeStage } = stageSlice.actions;

export default stageSlice.reducer;
