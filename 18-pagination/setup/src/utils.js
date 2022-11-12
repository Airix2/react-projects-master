const paginate = (followers) => {
	const itemsPerPage = 3;
	const pages = Math.ceil(followers.length / itemsPerPage);

	const newFollowers = Array.from({ length: pages }, (_, index) => {
		const start = index * itemsPerPage;
		return followers.slice(start, start + itemsPerPage);
	});
	console.log(newFollowers);
	return newFollowers;
};

export default paginate;
