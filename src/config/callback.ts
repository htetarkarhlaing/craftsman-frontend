import { v4 as uuid } from "uuid";

const systemCallbacks = [
	{
		id: uuid(),
		name: "Start",
		callback: "start-system",
		parameter: [],
	},
	{
		id: uuid(),
		name: "Back To Main Menu",
		callback: "start-system",
		parameter: [],
	},
	{
		id: uuid(),
		name: "Logout",
		callback: "system-logout",
		parameter: [],
	},
];

export { systemCallbacks };
