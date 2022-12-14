import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
	const [loading, setLoading] = useState(false);
	const [photos, setPhotos] = useState([]);
	const [page, setPage] = useState(1);
	const [query, setQuery] = useState("");
	const [newImages, setNewImages] = useState(false);
	const mounted = useRef(null);

	const fetchImages = async () => {
		setLoading(true);
		let url;
		const urlClientId = `client_id=${process.env.REACT_APP_ACCESS_KEY}`;
		const urlPage = `page=${page}`;
		const urlQuery = `query=${query}`;

		if (query === "") {
			url = `${mainUrl}?${urlClientId}&${urlPage}`;
		} else {
			url = `${searchUrl}?${urlClientId}&${urlPage}&${urlQuery}`;
		}

		try {
			const response = await fetch(url);
			const data = await response.json();
			setPhotos((oldPhotos) => {
				if (query !== "" && page === 1) {
					return data.results;
				} else if (query) {
					return [...oldPhotos, ...data.results];
				} else {
					return [...oldPhotos, ...data];
				}
			});
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
		setNewImages(false);
	};

	useEffect(() => {
		fetchImages();
	}, [page]);

	useEffect(() => {
		if (!mounted.current) {
			mounted.current = true;
			// return because it's not mounted,
			// next code will not run on initial render
			return;
		}
		if (!newImages) return;
		if (loading) return;
		setPage((oldPage) => {
			return oldPage + 1;
		});
	}, [newImages]);

	const event = () => {
		if (
			window.innerHeight + window.scrollY >=
			document.body.scrollHeight - 2
		) {
			setNewImages(true);
		}
	};
	useEffect(() => {
		window.addEventListener("scroll", event);
		return () => window.removeEventListener("scroll", event);
	}, []);

	// useEffect(() => {
	// 	const event = window.addEventListener("scroll", () => {
	// 		if (
	// 			!loading &&
	// 			window.innerHeight + window.scrollY >=
	// 				document.body.scrollHeight - 2
	// 		) {
	// 			setPage((oldPage) => {
	// 				return oldPage + 1;
	// 			});
	// 		}
	// 	});
	// 	return () => window.removeEventListener("scroll", event);
	// }, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		// if (!query) return;
		if (page === 1) {
			fetchImages();
			return;
		}
		setPage(1);
	};

	useEffect(() => {
		//console.log(photos);
	}, [photos]);

	return (
		<main>
			<section className="search">
				<form className="search-form">
					<input
						type="text"
						className="form-input"
						placeholder="search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<button
						type="submit"
						className="submit-btn"
						style={{ cursor: "pointer" }}
						onClick={handleSubmit}
					>
						<FaSearch />
					</button>
				</form>
			</section>
			<section className="photos">
				<div className="photos-center">
					{photos &&
						photos.map((item, index) => {
							return <Photo key={index} {...item} />;
						})}
				</div>
				{loading && <h2 className="loading">Loading...</h2>}
			</section>
		</main>
	);
}

export default App;
