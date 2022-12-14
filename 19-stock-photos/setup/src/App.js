import React, { useState, useEffect } from "react";
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
	const [changedQuery, setChangedQuery] = useState(false);

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
			let images = [];
			if (query) {
				images = data.results;
			} else {
				images = data;
			}
			setPhotos((oldPhotos) => {
				if (changedQuery) {
					setChangedQuery(false);
					return images;
				} else {
					return [...oldPhotos, ...images];
				}
			});
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchImages();
	}, [page]);

	useEffect(() => {
		const event = window.addEventListener("scroll", () => {
			if (
				!loading &&
				window.innerHeight + window.scrollY >=
					document.body.scrollHeight - 2
			) {
				setPage((oldPage) => {
					return oldPage + 1;
				});
			}
		});
		return () => window.removeEventListener("scroll", event);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (changedQuery) {
			fetchImages();
			return;
		}
		setPage(1);
	};

	return (
		<main>
			<section className="search">
				<form className="search-form">
					<input
						type="text"
						className="form-input"
						placeholder="search"
						value={query}
						onChange={(e) => {
							setQuery(e.target.value);
							setChangedQuery(true);
						}}
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
