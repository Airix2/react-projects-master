import React, { useEffect, useState, useCallback } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
	const { state, dispatch } = useGlobalContext();
	const { cocktailId } = useParams();
	const [cocktail, setCocktail] = useState(null);

	const getCocktail = useCallback(async () => {
		dispatch({ type: "SET_LOADING", payload: true });
		const resp = await axios.get(`${url}${cocktailId}`);
		if (resp.data.drinks) {
			setCocktail(resp.data.drinks[0]);
		} else {
			setCocktail(null);
		}
		dispatch({ type: "SET_LOADING", payload: false });
	}, [cocktailId, dispatch]);

	useEffect(() => {
		getCocktail();
	}, [cocktailId, getCocktail]);

	if (state.loading) return <Loading />;
	if (!cocktail)
		return (
			<h2 className="section-title">Nothing to display for this ID</h2>
		);

	return (
		<section className="section cocktail-section">
			<Link to="/" className="btn btn-primary">
				Back Home
			</Link>
			<h2 className="section-title">{cocktail.strDrink}</h2>
			<div className="drink">
				<img src={cocktail.strDrinkThumb} alt="" />
				<div className="drink-info">
					<p>
						<span className="drink-data">Name</span>
						{cocktail.strDrink}
					</p>
					<p>
						<span className="drink-data">category</span>
						{cocktail.strCategory}
					</p>
					<p>
						<span className="drink-data">info</span>
						{cocktail.strAlcoholic}
					</p>
					<p>
						<span className="drink-data">glass</span>
						{cocktail.strGlass}
					</p>
				</div>
			</div>
		</section>
	);
};

export default SingleCocktail;
