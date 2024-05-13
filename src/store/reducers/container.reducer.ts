import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IContainerPayload {
	type: "single" | "double";
	id: string;
	index: number;
}

interface IContainerState {
	value: IContainerPayload[];
}

const initialState: IContainerState = {
	value: [],
};

export const containerSlice = createSlice({
	name: "container",
	initialState,
	reducers: {
		addContainer: (state, action: PayloadAction<IContainerPayload>) => {
			const { type, id, index } = action.payload;
			state.value = [
				...state.value,
				{
					type,
					id,
					index,
				},
			];
		},

		removeContainer: (state, action: PayloadAction<{ id: string }>) => {
			const { id } = action.payload;
			const removedItem = state.value.filter((item) => item.id !== id);
			state.value = removedItem;
		},

		emptyContainer: (state) => {
			state.value = [];
		},
	},
});

export const { addContainer, removeContainer, emptyContainer } =
	containerSlice.actions;

export default containerSlice.reducer;
