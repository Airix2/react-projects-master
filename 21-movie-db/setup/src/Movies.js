import React from "react";
import { useGlobalContext, API_ENDPOINT } from "./context";
import { Link } from "react-router-dom";
const url =
	"https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const Movies = () => {
	const {
		state: { loading, movies },
	} = useGlobalContext();
	if (loading) return <section className="loading"></section>;
	return (
		<section className="movies">
			{movies.map((movie) => {
				let { Title, Year, Poster, imdbID } = movie;
				return (
					<Link key={imdbID} className="movie" to={`movie/${imdbID}`}>
						<article>
							<img src={Poster} alt={Title} />
							<div className="movie-info">
								<h4 className="title">{Title}</h4>
								<p>{Year}</p>
							</div>
						</article>
					</Link>
				);
			})}
		</section>
	);
};

export default Movies;
