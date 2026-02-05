export const getMatches = async () => {
  const response = await fetch("http://localhost:3000/matches", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch matches: ${response.statusText}`);
  }

  return response.json();
};
