import { ReactNode } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useAppDispatch, useAppSelector } from "../../store";
import { addContainer } from "../../store/reducers/container.reducer";
import { v4 as uuid } from "uuid";
import { addAction } from "../../store/reducers/action.reducer";

interface IMainContainer {
	children?: ReactNode;
}

interface IContainerPayload {
	type: "single" | "double";
}

// * ---------------------------------------------- for Layout Stage --------------------------------------------

const MainContainer = ({ children }: IMainContainer) => {
	const dispatch = useAppDispatch();

	const containerList = useAppSelector((state) => state.container.value);

	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: "container",
			drop(item: IContainerPayload, monitor) {
				const didDrop = monitor.didDrop();
				if (didDrop) {
					return;
				}
				dispatch(
					addContainer({
						type: item.type,
						index: containerList.length, // * index start from zero xD
						id: uuid(),
					})
				);
			},
			collect: (monitor) => ({
				isOver: monitor.isOver(),
				isOverCurrent: monitor.isOver({ shallow: true }),
			}),
		}),
		[containerList]
	);

	return (
		<div
			ref={drop}
			className={`w-full ${
				isOver ? "bg-green-600/20 pb-[80px]" : "bg-white/5"
			} border border-white border-dashed rounded-lg p-4`}
		>
			{children}
		</div>
	);
};

const SingleContainer = () => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: "container",
		item: { type: "single" },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	return (
		<div
			ref={drag}
			className={`${
				isDragging && "opacity-50"
			} text-blue-700 p-2 border border-blue-700 border-dashed rounded-lg cursor-move`}
		>
			<div className="text-center border rounded-lg bg-blue-700/20 p-2 border-blue-700">
				Single Box
			</div>
		</div>
	);
};

const DoubleContainer = () => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: "container",
		item: { type: "double" },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	return (
		<div
			ref={drag}
			className={`${
				isDragging && "opacity-50"
			} p-2 text-blue-700 border border-blue-700 border-dashed rounded-lg flex gap-2 cursor-move`}
		>
			<div className="w-full text-center border rounded-lg bg-blue-700/20 p-2 border-blue-700">
				First Box
			</div>
			<div className="w-full text-center border rounded-lg bg-blue-700/20 p-2 border-blue-700">
				Second Box
			</div>
		</div>
	);
};

const SingleContainerPreview = () => {
	return (
		<div className="text-center border rounded-lg bg-white/20 p-2 border-white">
			Single Box
		</div>
	);
};

const DoubleContainerPreview = () => {
	return (
		<div className={`flex gap-2`}>
			<div className="w-full text-center border rounded-lg bg-white/20 p-2 border-white">
				First Box
			</div>
			<div className="w-full text-center border rounded-lg bg-white/20 p-2 border-white">
				Second Box
			</div>
		</div>
	);
};

// * ---------------------------------------------- for Action Stage --------------------------------------------

const MainAVContainer = ({ children }: IMainContainer) => {
	return (
		<div className={`w-full bg-white/5 border border-white rounded-lg p-4`}>
			{children}
		</div>
	);
};

interface IAVContainer {
	id: string;
	children?: ReactNode;
}

interface IAVPayload {
	type: "display" | "input" | "callback" | "external";
	content?: string;
	callback?: string;
	parameters?: string[];
}

const SingleAVContainer = ({ id, children }: IAVContainer) => {
	const dispatch = useAppDispatch();

	const containerList = useAppSelector((state) => state.container.value);
	const actionList = useAppSelector((state) => state.action.value);

	const totalActionItem = actionList.filter(
		(action) => action.containerId === id
	).length;

	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: "single-item",
			drop(item: IAVPayload, monitor) {
				const didDrop = monitor.didDrop();
				if (didDrop) {
					return;
				}
				console.log(item);
				dispatch(
					addAction({
						type: item.type,
						index: totalActionItem,
						containerId: id,
						id: uuid(),
						containerType: "single",
						content: item.content,
						callback: item.callback,
						parameters: item.parameters,
					})
				);
			},
			collect: (monitor) => ({
				isOver: monitor.isOver(),
				isOverCurrent: monitor.isOver({ shallow: true }),
			}),
		}),
		[containerList]
	);

	return (
		<div
			ref={drop}
			className={`${
				isOver ? "bg-green-600/20" : "bg-white/10"
			} text-white p-4 border border-white border-dashed rounded-lg`}
		>
			{children}
		</div>
	);
};

interface IDoubleAVContainer {
	id: string;
	firstChild: ReactNode;
	secondChild: ReactNode;
}

const DoubleAVContainer = ({
	id,
	firstChild,
	secondChild,
}: IDoubleAVContainer) => {
	const dispatch = useAppDispatch();

	const containerList = useAppSelector((state) => state.container.value);
	const actionList = useAppSelector((state) => state.action.value);

	const totalActionItem = actionList.filter(
		(action) => action.containerId === id
	);

	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: "double-item",
			drop(item: IAVPayload, monitor) {
				const didDrop = monitor.didDrop();
				if (didDrop) {
					return;
				}
				console.log(item);
				dispatch(
					addAction({
						type: item.type,
						index: 0,
						containerId: id,
						id: uuid(),
						containerType: "double",
						content: item.content,
						callback: item.callback,
						parameters: item.parameters,
					})
				);
			},
			collect: (monitor) => ({
				isOver: monitor.isOver(),
				isOverCurrent: monitor.isOver({ shallow: true }),
			}),
		}),
		[containerList]
	);

	const [{ secondIsOver }, secondDrop] = useDrop(
		() => ({
			accept: "double-item",
			drop(item: IAVPayload, monitor) {
				const didDrop = monitor.didDrop();
				if (didDrop) {
					return;
				}
				console.log(item);
				dispatch(
					addAction({
						type: item.type,
						index: 1,
						containerId: id,
						id: uuid(),
						containerType: "double",
						content: item.content,
						callback: item.callback,
						parameters: item.parameters,
					})
				);
			},
			collect: (monitor) => ({
				secondIsOver: monitor.isOver(),
				isOverCurrent: monitor.isOver({ shallow: true }),
			}),
		}),
		[containerList]
	);

	return (
		<div className={`text-white flex gap-2`}>
			<div
				ref={drop}
				className={`${
					isOver ? "bg-green-600/20" : "bg-white/10"
				} w-full text-center border border-dashed rounded-lg p-4 border-white`}
			>
				{firstChild}
			</div>
			<div
				ref={secondDrop}
				className={`${
					secondIsOver ? "bg-green-600/20" : "bg-white/10"
				} w-full text-center border border-dashed rounded-lg p-4 border-white`}
			>
				{secondChild}
			</div>
		</div>
	);
};

export {
	MainContainer,
	SingleContainer,
	DoubleContainer,
	SingleContainerPreview,
	DoubleContainerPreview,
	MainAVContainer,
	SingleAVContainer,
	DoubleAVContainer,
};
