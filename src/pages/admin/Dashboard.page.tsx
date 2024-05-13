// import { useState, useMemo } from "react";
import DemoPlayground from "../../components/block/DemoPlayground";
// import { Listbox, ListboxItem } from "@nextui-org/react";
import Preview from "../../components/block/Preview";

const Dashboard = () => {
	// const [selectedKeys, setSelectedKeys] = useState<Set<number | string>>(
	// 	new Set(["text"])
	// );

	// const selectedValue = useMemo(
	// 	() => Array.from(selectedKeys).join(", "),
	// 	[selectedKeys]
	// );

	return (
		<div className="w-full h-full flex items-center justify-between px-4 space-x-4">
			<div className="w-full h-full flex space-x-4">
				<div className="w-full h-full py-4">
					<h4 className="text-center text-green-600">Preview</h4>
					<div className="w-[300px] h-full border border-dashed border-green-600 bg-green-700/10 rounded-small flex-1 p-4">
						<Preview />
					</div>
				</div>
				<div className="w-full h-full py-4">
					<h4 className="text-center text-yellow-700">Playground</h4>
					<DemoPlayground />
				</div>
			</div>
			<div className="w-full h-full flex items-center justify-center">
				{/* <Listbox
					aria-label="Single selection example"
					variant="flat"
					disallowEmptySelection
					selectionMode="single"
					selectedKeys={selectedKeys}
					onSelectionChange={(selected) =>
						setSelectedKeys(selected as Set<number | string>)
					}
				>
					<ListboxItem key="main-card">Main Card</ListboxItem>
				</Listbox> */}
				Additional Panel (coming soon)
			</div>
		</div>
	);
};

export default Dashboard;
