export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.airtable.com/v0/appod7WzPQ3JyCFlI/CARS?view=Grid%20view",
      {
        headers: {
          Authorization: "Bearer patFhJ1GJYKQKoWLN"
        }
      }
    );

    const text = await response.text();

    console.log("RAW RESPONSE:");
    console.log(text);

    return res.status(200).send(text);

  } catch (error) {
    console.log("ERROR:", error.message);

    return res.status(500).json({
      error: error.message
    });
  }
}
