const db = require('../db');

// journey is checked and parsed (strings are normalized, including whitespaces) before being passed to addJourneyToDb
const addJourneyToDb = async (journey) => {
	try {
		const departureStation = await db.query(
			`SELECT * FROM stations WHERE station_id = $1`,
			[journey['Departure station id']]
		);
		if (
			departureStation.rowCount !== 1 ||
			(departureStation.rows[0].nimi.substring(0, 26) !==
				journey['Departure station name'].substring(0, 26) &&
				departureStation.rows[0].namn.substring(0, 26) !==
					journey['Departure station name'].substring(0, 26) &&
				departureStation.rows[0].name.substring(0, 26) !==
					journey['Departure station name'].substring(0, 26))
		)
			return { error: 'Departure station is not valid.' };

		const returnStation = await db.query(
			`SELECT * FROM stations WHERE station_id = $1`,
			[journey['Return station id']]
		);
		if (
			returnStation.rowCount !== 1 ||
			(returnStation.rows[0].nimi.substring(0, 26) !==
				journey['Return station name'].substring(0, 26) &&
				returnStation.rows[0].namn.substring(0, 26) !==
					journey['Return station name'].substring(0, 26) &&
				returnStation.rows[0].name.substring(0, 26) !==
					journey['Return station name'].substring(0, 26))
		)
			return { error: 'Return station is not valid.' };

		const result = await db.query(
			`INSERT INTO journeys (departure_time, return_time, departure_station_id, departure_station_name, return_station_id, return_station_name, covered_distance_meters, duration_seconds) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
			[
				journey.Departure,
				journey.Return,
				journey['Departure station id'],
				journey['Departure station name'],
				journey['Return station id'],
				journey['Return station name'],
				journey['Covered distance (m)'],
				journey['Duration (sec.)'],
			]
		);
		return result.rowCount;
	} catch (e) {
		return { error: 'Journey could not be added.' };
	}
};

module.exports = { addJourneyToDb };
