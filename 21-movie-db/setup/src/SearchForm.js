import React from "react";
import { useGlobalContext } from "./context";

const SearchForm = () => {
	const { state, dispatch, getMovies } = useGlobalContext();
	const handleChange = (text) => {
		dispatch({ type: "SEARCH_UPDATED", payload: text });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		// dispatch({ type: "GET_MOVIES" });
		getMovies();
	};

	return (
		<form onSubmit={handleSubmit} className="search-form">
			<h4>Search for:</h4>
			<input
				type="text"
				className="form-input"
				onChange={(e) => handleChange(e.target.value)}
				value={state.search}
			/>
			<button className="btn">Search</button>
			{state.movies.length == 0 && <h5>No Movies Found!</h5>}
			{state.error.show && <div className="error">{state.error.msg}</div>}
		</form>
	);
};

export default SearchForm;
