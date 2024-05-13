import { useEffect, useState } from "react";
import {Spinner} from "@nextui-org/react";
import Welcome from "../pages/Welcome.page";
import AdminRoutes from "./Admin";

const Routes = () => {
	const [bufferState, setBufferState] = useState(false);
	const [authType, setAuthType] = useState<"idle" | "user" | "admin">("idle");

	const SELECTED_TYPE = localStorage.getItem("type");

	useEffect(() => {
		if (SELECTED_TYPE) {
			setBufferState(true);
			setAuthType(SELECTED_TYPE === "user" ? "user" : "admin");
		} else {
			setBufferState(true);
		}
	}, [SELECTED_TYPE]);

	if (bufferState) {
		if (authType === "user") {
			return <div>Loading...</div>;
		} else if (authType === "admin") {
			return <AdminRoutes />;
		} else {
			return <Welcome />;
		}
	} else {
		return  <Spinner />;
	}
};

export default Routes;
