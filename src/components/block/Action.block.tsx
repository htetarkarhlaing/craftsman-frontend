import {
	Button,
	ButtonGroup,
	RadioGroup,
	Radio,
	Select,
	SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { useDrag } from "react-dnd";
import { systemCallbacks } from "../../config/callback";

const TextBlock = () => {
	const [text, setText] = useState("");
	const [align, setAlign] = useState<"left" | "center" | "justify">("left");

	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: "single-item",
			item: {
				type: "display",
				content: text,
				callback: null,
				parameters: null,
			},
			collect: (monitor) => ({
				isDragging: !!monitor.isDragging(),
			}),
		}),
		[text, align]
	);

	return (
		<div
			className={`w-full p-2 mb-2 border-dashed border-b ${
				isDragging && "opacity-50"
			}`}
		>
			<p>
				Text View <span className="text-cyan-700 text-sm font-bold">(1:1)</span>
			</p>
			<div
				ref={drag}
				className={`w-full text-${align} border border-dashed p-2 cursor-move bg-white/5 rounded-lg`}
			>
				{text || "Preview text will appear here..."}
			</div>

			<textarea
				value={text}
				onChange={(e) => setText(e.target.value)}
				className="bg-transparent w-full appearance-none outline-none focus:outline-none border mt-2 rounded-lg p-2"
				placeholder="Enter your text here"
			></textarea>
			<ButtonGroup variant="flat" size="sm" fullWidth>
				<Button onClick={() => setAlign("left")}>
					<i className="pi pi-align-left"></i>
				</Button>
				<Button onClick={() => setAlign("center")}>
					<i className="pi pi-align-center"></i>
				</Button>
				<Button onClick={() => setAlign("justify")}>
					<i className="pi pi-align-justify"></i>
				</Button>
				<Button onClick={() => setText("")}>
					<i className="pi pi-times"></i>
				</Button>
			</ButtonGroup>
		</div>
	);
};

const CallbackButton = () => {
	const [type, setType] = useState<"single-item" | "double-item">(
		"single-item"
	);
	const [text, setText] = useState("");
	const [align, setAlign] = useState<"left" | "center" | "justify">("left");

	const [callbackType, setCallbackType] = useState<
		"system-callback" | "application-callback" | "custom-node"
	>("system-callback");
	const [callbackId, setCallbackId] = useState("");

	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: type,
			item: {
				type: "callback",
				content: text,
				callback: callbackId,
				parameters: null,
			},
			collect: (monitor) => ({
				isDragging: !!monitor.isDragging(),
			}),
		}),
		[text, align, type]
	);

	return (
		<div
			className={`w-full p-2 mb-2 border-dashed border-b ${
				isDragging && "opacity-50"
			}`}
		>
			<p>
				Callback Button{" "}
				<span
					className={`${
						type === "single-item" ? "text-cyan-700" : "text-gray-500"
					} text-sm font-bold cursor-pointer`}
					onClick={() => setType("single-item")}
				>
					(1:1)
				</span>{" "}
				/{" "}
				<span
					className={`${
						type === "double-item" ? "text-cyan-700" : "text-gray-500"
					} text-sm font-bold cursor-pointer`}
					onClick={() => setType("double-item")}
				>
					(1:2)
				</span>
			</p>
			<div
				ref={drag}
				className={`border border-dashed p-2 cursor-move rounded-lg ${
					type === "double-item" ? "w-1/2" : "w-full"
				}`}
			>
				<div
					className={`w-full text-${align} border border-cyan-700 p-2 bg-cyan-700/5 text-cyan-700 rounded-lg`}
				>
					{text || "Caption"}
				</div>
			</div>

			<input
				value={text}
				onChange={(e) => setText(e.target.value)}
				className="bg-transparent w-full appearance-none outline-none focus:outline-none border my-2 rounded-lg p-2"
				placeholder="Enter your caption here"
				maxLength={100}
			></input>
			<ButtonGroup variant="flat" size="sm" fullWidth>
				<Button onClick={() => setAlign("left")}>
					<i className="pi pi-align-left"></i>
				</Button>
				<Button onClick={() => setAlign("center")}>
					<i className="pi pi-align-center"></i>
				</Button>
				<Button onClick={() => setAlign("justify")}>
					<i className="pi pi-align-justify"></i>
				</Button>
				<Button onClick={() => setText("")}>
					<i className="pi pi-times"></i>
				</Button>
			</ButtonGroup>
			<RadioGroup label="Callback Type" color="warning" className="mt-2">
				<Radio
					value="system-callback"
					checked={callbackType === "system-callback"}
					defaultChecked
					onClick={() => setCallbackType("system-callback")}
				>
					<span className="text-white">System Callback</span>
				</Radio>
				<Radio
					value="application-callback"
					checked={callbackType === "application-callback"}
					onClick={() => setCallbackType("application-callback")}
				>
					<span className="text-white">Application Callback</span>
				</Radio>
				<Radio
					value="custom-node"
					checked={callbackType === "custom-node"}
					onClick={() => setCallbackType("custom-node")}
				>
					<span className="text-white">Custom Node</span>
				</Radio>
			</RadioGroup>
			{callbackType === "system-callback" && (
				<Select
					items={systemCallbacks}
					label="System Callback"
					placeholder="Select an callback"
					className="max-w-xs mt-2"
					color="default"
					variant="bordered"
					onChange={e => setCallbackId(e.target.value)}
				>
					{(sysCallback) => (
						<SelectItem key={sysCallback.id}>{sysCallback.name}</SelectItem>
					)}
				</Select>
			)}
		</div>
	);
};

export { TextBlock, CallbackButton };
