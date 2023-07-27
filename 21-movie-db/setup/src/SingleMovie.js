import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT, useGlobalContext } from "./context";

const SingleMovie = () => {
	const { id } = useParams();
	const {
		getMovie,
		state: { movie, loading },
	} = useGlobalContext();

	useEffect(() => {
		getMovie(id);
	}, []);

	useEffect(() => {
		console.log(movie);
	}, [movie]);

	if (loading) return <div className="loading"></div>;

	return (
		<section className="single-movie">
			<img src={movie.Poster} alt={movie.Title} />
			<div className="single-movie-info">
				<h2>{movie.Title}</h2>
				<p>{movie.Plot}</p>
				<h4>{movie.Year}</h4>
				<Link to="/" className="btn">
					Back to movies
				</Link>
			</div>
		</section>
	);
};

export default SingleMovie;
