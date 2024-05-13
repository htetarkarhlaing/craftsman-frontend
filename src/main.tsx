import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Routes from "./routes";

import "./index.css";
import 'primeicons/primeicons.css';


ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
		<NextUIProvider>
			<BrowserRouter>
				<main className="bg-gray-950 text-white w-screen h-screen">
					<Routes />
				</main>
			</BrowserRouter>
		</NextUIProvider>
		</Provider>
	</React.StrictMode>
);
