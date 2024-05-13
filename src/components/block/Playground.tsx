import SkeletonBlock from "./Skeleton.block";

const Playground = () => {
	return (
		<div className="w-full h-full border border-dashed rounded-small flex gap-4 p-4">
			<div className="w-[300px] h-full">
				<SkeletonBlock />
			</div>
			<div className="w-[300px] h-full">
				{/* <DragDropContext onDragEnd={() => {}}>
					<Droppable droppableId="droppable">
						{(provided, snapshot) => (
							<div {...provided.droppableProps} ref={provided.innerRef}>
								<Draggable draggableId="one" index={1}>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<SkeletonBlock />
										</div>
									)}
								</Draggable>

                                <Draggable draggableId="two" index={2}>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<SkeletonBlock />
										</div>
									)}
								</Draggable>

								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext> */}
			</div>
		</div>
	);
};

export default Playground;
