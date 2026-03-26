export default async function handler(req, res) {
  try {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME || 'Cars';
    const token = process.env.AIRTABLE_PAT;

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

    const airtableRes = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await airtableRes.json();

    const rows = (data.records || []).map((record) => ({
      id: record.id,
      make: record.fields.Make || '',
      model: record.fields.Model || '',
      price: record.fields.Price || 0,
      year: record.fields.Year || '',
      mileage: record.fields.Mileage || 0,
      fuel: record.fields.Fuel || '',
      transmission: record.fields.Transmission || '',
      colour: record.fields.Colour || '',
      body: record.fields.Body || '',
      status: record.fields.Status || 'Available',
      description: record.fields.Description || '',
      photos: Array.isArray(record.fields.Photos)
        ? record.fields.Photos.map(p => p.url)
        : []
    }));

    res.status(200).json(rows);

  } catch (err) {
    res.status(500).json({ error: 'Failed to load cars' });
  }
}
