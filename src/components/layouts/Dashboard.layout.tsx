import { Link, Outlet } from "react-router-dom";
import { Button, ScrollShadow } from "@nextui-org/react";
import { useLocation } from "react-router-dom";

const DashboardLayout = () => {
	const { pathname } = useLocation();

	return (
		<div className="w-full h-full flex">
			<div className="w-[300px] h-full border-r-1 border-gray-600">
				<h5 className="p-3 text-center text-white text-lg font-bold">
					Craftsman
				</h5>

				<div className="mt-8 w-full relative">
					{[
						{
							path: "/dashboard",
							label: "Block Editor",
						},
						{
							path: "/dashboard/flow",
							label: "Flow Management",
						},
						{
							path: "/dashboard/other-services",
							label: "Other Services",
						},
					].map((route, key) => {
						const matched = route.path === pathname;
						return (
							<Link to={route.path} className="w-full" key={key}>
								<span
									className={`block pl-4 py-2 w-full border-l-2 border-transparent ${
										matched && "bg-white/5 border-white"
									}`}
								>
									{route.label}
								</span>
							</Link>
						);
					})}

					<Button
						variant="faded"
						className="absolute -bottom-[500px] left-[50%] translate-x-[-50%]"
						onClick={() => {
							localStorage.clear();
							window.location.reload();
						}}
					>
						Logout
					</Button>
				</div>
			</div>

			<ScrollShadow hideScrollBar className="w-full h-screen">
				{/* <div className="w-full h-16 border-b-1 border-gray-600 bg-gray-950 fixed z-50"></div> */}
				{/* <div className="pt-16 h-full"> */}
				<Outlet />
				{/* </div> */}
			</ScrollShadow>
		</div>
	);
};

export default DashboardLayout;
