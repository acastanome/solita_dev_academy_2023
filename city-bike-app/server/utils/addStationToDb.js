const db = require('../db');

// station is checked and pre-parsed for db before being passed to addStationToDb
const addStationToDb = async (station) => {
	try {
		const result = await db.query(
			`INSERT INTO stations (station_id, nimi, namn, name, osoite, adress, kaupunki, stad, operaattor, kapasiteet, x, y) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
			[
				station.ID,
				station.Nimi,
				station.Namn,
				station.Name,
				station.Osoite,
				station.Adress,
				station.Kaupunki,
				station.Stad,
				station.Operaattor,
				station.Kapasiteet,
				station.x,
				station.y,
			]
		);
		return result.rowCount;
	} catch (e) {
		// postgres error 23505 means duplicate key value
		if (e['code'] === '23505') {
			return {
				error: 'That station id already exists in db and could not be added.',
			};
		} else {
			return {
				error: 'Station could not be added.',
			};
		}
	}
};

module.exports = { addStationToDb };
