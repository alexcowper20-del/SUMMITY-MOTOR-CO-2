export default async function handler(req, res) {
  const response = await fetch(
    "https://api.airtable.com/v0/appod7WzPQ3JyCFI1/CARS",
    {
      headers: {
        Authorization: "Bearer patFhJ1GJYKQKoWLN"
      }
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
    });

    const data = await airtableRes.json();

    const rows = (data.records || []).map((record) => ({
      id: record.id,

      // ✅ MATCH YOUR AIRTABLE (lowercase)
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

      // ✅ MULTIPLE IMAGES READY
      photos: Array.isArray(record.fields.photos)
        ? record.fields.photos.map(p => p.url)
        : []
    }));

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
