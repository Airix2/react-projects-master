import React from "react";
import { useEffect, useRef } from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
	const { state, dispatch } = useGlobalContext();
	const inputRef = useRef(null);

	const handleChange = (e) => {
		dispatch({ type: "UPDATE_SEARCH", payload: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	useEffect(() => {
		inputRef.current.focus();
	}, []);

	return (
		<div className="search">
			<form className="search-form form-control" onSubmit={handleSubmit}>
				<label>Search your favorite cocktail</label>
				<input
					type="text"
					defaultValue={state.textSearch}
					onChange={(e) => handleChange(e)}
					ref={inputRef}
				/>
			</form>
		</div>
	);
};

export default SearchForm;
