import React from "react";
import Cocktail from "./Cocktail";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const CocktailList = () => {
	const { state } = useGlobalContext();
	if (state.loading) return <Loading />;

	if (state.cocktailList.length < 1) {
		return (
			<div className="section">
				<h4 className="section-title">Cocktails</h4>
				<h6 className="section-title">
					No cocktails matched the search
				</h6>
			</div>
		);
	}
	return (
		<div className="section">
			<h4 className="section-title">Cocktails</h4>
			<div className="cocktails-center">
				{state.cocktailList.map((item) => {
					return <Cocktail item={item} key={item.idDrink} />;
				})}
			</div>
		</div>
	);
};

export default CocktailList;
