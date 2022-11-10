import React from "react";
import { Link } from "react-router-dom";

const Cocktail = ({ item }) => {
	return (
		<div className="cocktail" key={item.idDrink}>
			<img src={item.strDrinkThumb} alt="" />
			<div className="cocktail-footer">
				<h4>{item.strDrink}</h4>
				<p>{item.strGlass}</p>
				<Link
					className="btn btn-primary"
					to={`/cocktail/${item.idDrink}`}
				>
					details
				</Link>
			</div>
		</div>
	);
};

export default Cocktail;
