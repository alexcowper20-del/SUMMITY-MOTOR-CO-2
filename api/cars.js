export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.airtable.com/v0/appod7WzPQ3JyCFlI/CARS",
      {
        headers: {
          Authorization: "Bearer patFhJ1GJYKQKoWLN"
        }
      }
    );

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
