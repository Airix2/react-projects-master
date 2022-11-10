import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import React from "react";

const SharedLayout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};
export default SharedLayout;
