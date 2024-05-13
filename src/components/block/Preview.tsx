/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect } from "react";
import { useAppSelector } from "../../store";
import { Button } from "@nextui-org/react";

const Preview = () => {
	const containerList = useAppSelector((state) => state.container.value);
	const currentStage = useAppSelector((state) => state.stage.value);
	const actionList = useAppSelector((state) => state.action.value);

	useEffect(() => {}, [containerList, actionList]);

	return (
		<div className="w-full border rounded-lg border-white bg-white/5 p-2 space-y-2">
			{currentStage === "LAYOUT" && containerList.length === 0 && (
				<span className="block text-center">Start build your block</span>
			)}
			{currentStage === "LAYOUT"
				? containerList.map((container, key) => {
						if (container.type === "single") {
							return (
								<div className="w-full" key={key}>
									<div className="w-full h-10 border border-dashed border-white rounded-lg bg-white/10"></div>
								</div>
							);
						} else {
							return (
								<div className="w-full flex gap-2" key={key}>
									<div className="w-full h-10 border border-dashed border-white rounded-lg bg-white/10"></div>
									<div className="w-full h-10 border border-dashed border-white rounded-lg bg-white/10"></div>
								</div>
							);
						}
				  })
				: containerList.map((container, key) => {
						const currentAction = actionList.filter(
							(action) => action.containerId === container.id
						);

						if (container.type === "single") {
							if (currentAction[0]) {
								if (currentAction[0].type === "display") {
									return (
										<div className="w-full" key={key}>
											{currentAction[0].content}
										</div>
									);
								} else if (currentAction[0].type === "callback") {
									return (
										<Button fullWidth key={key}>
											{currentAction[0].content}
										</Button>
									);
								}
							} else {
								return (
									<div className="w-full" key={key}>
										<div className="w-full h-10 border border-dashed border-white rounded-lg bg-white/10"></div>
									</div>
								);
							}
						} else {
							return (
								<div className="w-full flex gap-2" key={key}>
									{currentAction[0] ? (
										currentAction[0].type === "display" ? (
											<div className="w-full" key={key}>
												{currentAction[0].content}
											</div>
										) : (
											<Button fullWidth key={key}>
												{currentAction[0].content}
											</Button>
										)
									) : (
										<div className="w-full h-10 border border-dashed border-white rounded-lg bg-white/10"></div>
									)}

									{currentAction[1] ? (
										currentAction[1].type === "display" ? (
											<div className="w-full" key={key}>
												{currentAction[1].content}
											</div>
										) : (
											<Button fullWidth key={key}>
												{currentAction[1].content}
											</Button>
										)
									) : (
										<div className="w-full h-10 border border-dashed border-white rounded-lg bg-white/10"></div>
									)}
								</div>
							);
						}
				  })}
		</div>
	);
};

export default Preview;
