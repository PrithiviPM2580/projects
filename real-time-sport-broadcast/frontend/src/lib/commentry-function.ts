export const getCommentary = async (id: string) => {
  const response = await fetch(
    `http://localhost:3000/matches/${id}/commentary`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch commentary: ${response.statusText}`);
  }

  return response.json();
};
