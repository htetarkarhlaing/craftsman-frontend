import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuid } from "uuid";
import {
	DoubleAVContainer,
	DoubleContainer,
	DoubleContainerPreview,
	MainAVContainer,
	MainContainer,
	SingleAVContainer,
	SingleContainer,
	SingleContainerPreview,
} from "./Container.block";
import { useAppDispatch, useAppSelector } from "../../store";
import { Button, ButtonGroup, ScrollShadow } from "@nextui-org/react";
import {
	emptyContainer,
	removeContainer,
} from "../../store/reducers/container.reducer";
import { changeStage } from "../../store/reducers/stage.reducer";
import { CallbackButton, TextBlock } from "./Action.block";
import ActionViewer from "./Action.Viewer";
import { emptyAction } from "../../store/reducers/action.reducer";

const DemoPlayground = () => {
	const dispatch = useAppDispatch();
	const containerList = useAppSelector((state) => state.container.value);
	const currentStage = useAppSelector((state) => state.stage.value);
	const actionList = useAppSelector((state) => state.action.value);

	const handleReset = () => {
		dispatch(emptyContainer());
	};

	const handleUndo = () => {
		const lastElement = containerList[containerList.length - 1];
		if (lastElement) {
			dispatch(
				removeContainer({
					id: lastElement.id,
				})
			);
		}
	};

	const handleNextStage = async () => {
		if (currentStage === "LAYOUT") {
			dispatch(changeStage("ACTION"));
		} else if (currentStage === "ACTION") {
			// ! this one have to save it in database
			// * But for demo we will save it in RAM first xD

			const containers = containerList.map((container) => {
				const actionBlock = actionList.filter(
					(action) => action.containerId === container.id
				);

				return {
					containerId: container.id,
					containerType: container.type,
					containerIndex: container.index,
					actions: actionBlock,
				};
			});

			localStorage.setItem(
				"blocks",
				JSON.stringify([
					{
						id: uuid(),
						containers: containers,
					},
				])
			);
			dispatch(emptyContainer());
			dispatch(emptyAction());
			dispatch(changeStage("LAYOUT"));
		}
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="w-full min-h-full border border-dashed border-yellow-700 rounded-md bg-yellow-700/5 flex">
				<div className="w-[350px] border-r-1 p-4 border-dashed border-yellow-700">
					<h4 className="text-center text-lg font-bold text-white mb-2">
						Draft Block
					</h4>
					{currentStage === "LAYOUT" ? (
						<MainContainer>
							{containerList.length === 0 && (
								<div className="w-full h-[100px] flex-1 flex items-center justify-center">
									Drop the required container here
								</div>
							)}
							{containerList && (
								<div className="space-y-2">
									{containerList.map((container, key) => {
										if (container.type === "single") {
											return <SingleContainerPreview key={key} />;
										} else {
											return <DoubleContainerPreview key={key} />;
										}
									})}
								</div>
							)}
						</MainContainer>
					) : (
						<MainAVContainer>
							{containerList && (
								<div className="space-y-2">
									{containerList.map((container, key) => {
										if (container.type === "single") {
											const previewAction = actionList.filter(
												(action) => action.containerId === container.id
											)[0]; // * first index because single container

											return (
												<SingleAVContainer key={key} id={container.id}>
													{previewAction ? (
														<ActionViewer {...previewAction} />
													) : (
														<div className="text-center">
															Drag{" "}
															<span className="text-cyan-700 text-sm font-bold">
																(1:1)
															</span>{" "}
															item
														</div>
													)}
												</SingleAVContainer>
											);
										} else {
											const previewAction = actionList.filter(
												(action) => action.containerId === container.id
											);

											return (
												<DoubleAVContainer
													key={key}
													id={container.id}
													firstChild={
														previewAction[0] ? (
															<ActionViewer {...previewAction[0]} />
														) : (
															<div className="text-center">
																Drag{" "}
																<span className="text-cyan-700 text-sm font-bold">
																	(1:2)
																</span>{" "}
																item
															</div>
														)
													}
													secondChild={
														previewAction[1] ? (
															<ActionViewer {...previewAction[1]} />
														) : (
															<div className="text-center">
																Drag{" "}
																<span className="text-cyan-700 text-sm font-bold">
																	(1:2)
																</span>{" "}
																item
															</div>
														)
													}
												/>
											);
										}
									})}
								</div>
							)}
						</MainAVContainer>
					)}

					{currentStage === "LAYOUT" && containerList.length > 0 && (
						<div className="w-full py-2">
							<ButtonGroup fullWidth variant="bordered">
								<Button color="danger" onClick={handleReset}>
									Reset
								</Button>
								<Button color="warning" onClick={handleUndo}>
									Undo
								</Button>
								<Button color="success" onClick={handleNextStage}>
									Next
								</Button>
							</ButtonGroup>
						</div>
					)}
					{currentStage === "ACTION" && actionList.length > 0 && (
						<div className="w-full py-2">
							<ButtonGroup fullWidth variant="bordered">
								<Button color="danger" onClick={handleReset}>
									Reset
								</Button>
								<Button color="success" onClick={handleNextStage}>
									Next
								</Button>
							</ButtonGroup>
						</div>
					)}
				</div>

				<div className="w-[350px] p-4">
					{currentStage === "LAYOUT" ? (
						<>
							<h4 className="text-center text-lg font-bold mb-2 text-blue-700">
								Containers
							</h4>
							<div className="space-y-2 px-2">
								<SingleContainer />
								<DoubleContainer />
							</div>
						</>
					) : (
						<>
							<h4 className="text-center text-lg font-bold mb-2 text-cyan-700">
								Action Items
							</h4>
							<ScrollShadow hideScrollBar className="h-[650px] space-y-2 px-2">
								<TextBlock />
								<CallbackButton />
							</ScrollShadow>
						</>
					)}
				</div>
			</div>
		</DndProvider>
	);
};

export default DemoPlayground;
