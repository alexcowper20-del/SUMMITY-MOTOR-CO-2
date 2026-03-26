export default async function handler(req, res) {
  try {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME || 'CARS';
    const token = process.env.AIRTABLE_TOKEN;

    const url = `https://api.airtable.com/v0/${baseId}/${tableName}?view=Grid%20view`;

    const airtableRes = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await airtableRes.json();

    const rows = (data.records || []).map((record) => ({
      id: record.id,
      make: record.fields.make || '',
      model: record.fields.model || '',
      price: record.fields.price || 0,
      year: record.fields.year || '',
      mileage: record.fields.mileage || 0,
      fuel: record.fields.fuel || '',
      transmission: record.fields.transmission || '',
      colour: record.fields.colour || '',
      body: record.fields.body || '',
      status: record.fields.status || 'Available',
      description: record.fields.description || '',
      photos: Array.isArray(record.fields.photos)
        ? record.fields.photos.map(p => p.url)
        : []
    }));

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load cars' });
  }
}
