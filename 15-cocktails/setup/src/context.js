import React, { useContext, useEffect, useReducer, useCallback } from "react";
import axios from "axios";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const emptyState = {
	cocktailList: [],
	textSearch: "",
	loading: true,
};

function reducer(state, action) {
	switch (action.type) {
		case "GET_COCKTAILS": {
			// console.log(state, { ...state, cocktailList: action.payload });
			return { ...state, cocktailList: action.payload };
		}
		case "UPDATE_SEARCH": {
			return { ...state, textSearch: action.payload };
		}
		case "SET_LOADING": {
			return { ...state, loading: action.payload };
		}
		default:
			return state;
	}
}

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, emptyState);

	const getCocktails = useCallback(async () => {
		dispatch({ type: "SET_LOADING", payload: true });
		try {
			const resp = await axios.get(`${url}${state.textSearch}`);
			console.log(resp.data.drinks);
			if (resp.data.drinks === null)
				dispatch({ type: "GET_COCKTAILS", payload: [] });
			else
				dispatch({
					type: "GET_COCKTAILS",
					payload: resp.data.drinks,
				});
		} catch (error) {
			console.log(error.response);
		}
		dispatch({ type: "SET_LOADING", payload: false });
	}, [state.textSearch]);

	useEffect(() => {
		getCocktails();
	}, [state.textSearch, getCocktails]);

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	);
};
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
