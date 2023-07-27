import React, { useContext, useEffect, useReducer } from "react";
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;
const AppContext = React.createContext();

const initialState = {
	search: "",
	movies: [],
	loading: false,
	error: { show: false, msg: "" },
	movie: {},
};

const reducer = (state, action) => {
	switch (action.type) {
		case "SEARCH_UPDATED":
			return { ...state, search: action.payload };
		case "SET_MOVIES":
			return { ...state, movies: action.payload };
		case "SET_MOVIE":
			return { ...state, movie: action.payload };
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		case "SET_ERROR":
			return { ...state, error: action.payload };
	}
};

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const getMovies = async () => {
		dispatch({ type: "SET_LOADING", payload: true });
		let response = await fetch(`${API_ENDPOINT}&s=${state.search}`);
		let data = await response.json();
		console.log(data);
		if (data.Search) dispatch({ type: "SET_MOVIES", payload: data.Search });
		dispatch({ type: "SET_LOADING", payload: false });
	};
	const getMovie = async (id) => {
		dispatch({ type: "SET_LOADING", payload: true });
		let response = await fetch(`${API_ENDPOINT}&i=${id}`);
		let data = await response.json();
		console.log(data);
		dispatch({ type: "SET_MOVIE", payload: { ...data } });
		dispatch({ type: "SET_LOADING", payload: false });
	};

	return (
		<AppContext.Provider value={{ state, dispatch, getMovies, getMovie }}>
			{children}
		</AppContext.Provider>
	);
};
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
