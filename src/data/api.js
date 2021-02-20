export const getPrograms = async () => {
  const programs = await fetch(
    "http://localhost:3000/api/v1/programs?userId=100350049&programId="
  ).then((response) => response.json());

  return programs;
};

export const getPlayLists = async () => {
  const playlists = await fetch(
    "http://localhost:3000/api/v1/playlists?userId=100350049&programId="
  ).then((response) => response.json());

  return playlists;
};
