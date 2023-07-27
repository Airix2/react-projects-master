import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query";

import Home from "./Home";
import Movie from "./SingleMovie";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="movie/:id" element={<Movie />} />
					<Route path="*" element={<h4>Error</h4>} />
				</Routes>
			</Router>
		</QueryClientProvider>
	);
}

export default App;
