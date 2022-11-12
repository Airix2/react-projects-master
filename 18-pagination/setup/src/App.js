import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";
function App() {
	const { loading, data } = useFetch();
	const [page, setPage] = useState(0);
	const [followers, setFollowers] = useState([]);

	useEffect(() => {
		if (loading) return;
		if (data.length == 0) return;
		setFollowers(data[page]);
	}, [loading, page, data]);

	const nextPage = () => {
		if (page === data.length - 1) return;
		setPage((oldPage) => {
			return oldPage + 1;
		});
	};
	const prevPage = () => {
		if (page === 0) return;
		setPage((oldPage) => {
			return oldPage - 1;
		});
	};
	const goToPage = (index) => {
		setPage(index);
	};

	return (
		<main>
			<div className="section-title">
				<h1>{loading ? "loading..." : "pagination"}</h1>
				<div className="underline"></div>
			</div>

			<section className="followers">
				<div className="container">
					{followers.map((follower) => {
						return <Follower key={follower.id} {...follower} />;
					})}
				</div>
				{!loading && data.length > 0 && (
					<div className="btn-container">
						<button className="btn" onClick={prevPage}>
							Back
						</button>
						{data.map((item, index) => {
							return (
								<button
									className={`page-btn ${
										index === page ? "active-btn" : ""
									}`}
									key={index}
									onClick={() => goToPage(index)}
								>
									{index + 1}
								</button>
							);
						})}
						<button className="btn" onClick={nextPage}>
							Next
						</button>
					</div>
				)}
			</section>
		</main>
	);
}

export default App;
