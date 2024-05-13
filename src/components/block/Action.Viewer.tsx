import { Button } from "@nextui-org/react";

interface IActionViewer {
	type: "display" | "input" | "callback" | "external";
	content?: string;
	callback?: string;
	parameters?: string[];
}

const ActionViewer = (data: IActionViewer) => {
	if (data.type === "display") {
		return <div>{data.content}</div>;
	} else if (data.type === "callback") {
		return <Button fullWidth>{data.content}</Button>;
	}
};

export default ActionViewer;
