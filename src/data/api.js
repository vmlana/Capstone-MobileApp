import { API_URL } from "../GLOBAL";
export const getPrograms = async () => {
	const programs = await fetch(
		`${API_URL}/programs?userId=100350049&programId=`
	)
		.then((response) => response.json())
		.catch((error) => console.error(error));
	return programs;
};

export const getPlayLists = async () => {
	const playlists = await fetch(
		`${API_URL}/playlists?userId=100350049&programId=`
	)
		.then((response) => response.json())
		.catch((error) => console.error(error));
	return playlists;
};

export const getInstructorInfo = async (instructoId) => {
	const instructor = await fetch(
		`${API_URL}/instructor?instructorId=${instructoId}`
	).then((response) => response.json())
		.catch((error) => console.error(error));
	return instructor;
};

export const getCategories = async() => {
	const categories = await fetch(
		`${API_URL}/categories`
	).then((response) => response.json())
		.catch((error) => console.error(error));
	return categories;
}

export const getPlayListsByCategoryId = async (categoryId) => {
	const playlists = await fetch(
		`${API_URL}/playlists?categoryId=${categoryId}`
	)
		.then((response) => response.json())
		.catch((error) => console.error(error));
	return playlists;
};


