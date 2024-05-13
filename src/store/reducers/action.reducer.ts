import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IStagePayload {
	containerType: "single" | "double";
	containerId: string;
	type: "display" | "input" | "callback" | "external";
	content?: string;
	callback?: string;
	parameters?: string[];
	id: string;
	index: number;
}

interface IActionState {
	value: IStagePayload[];
}

const initialState: IActionState = {
	value: [],
};

export const actionSlice = createSlice({
	name: "action",
	initialState,
	reducers: {
		addAction: (state, action: PayloadAction<IStagePayload>) => {
			const payloads = action.payload;
			state.value = [
				...state.value,
				{
					...payloads,
				},
			];
		},

		removeAction: (state, action: PayloadAction<{ containerId: string }>) => {
			const { containerId } = action.payload;
			const removedItem = state.value.filter(
				(item) => item.containerId !== containerId
			);
			state.value = removedItem;
		},

		emptyAction: (state) => {
			state.value = [];
		},
	},
});

export const { addAction, removeAction, emptyAction } = actionSlice.actions;

export default actionSlice.reducer;
