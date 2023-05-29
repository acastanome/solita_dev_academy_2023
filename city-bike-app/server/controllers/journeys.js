const db = require('../db');
const { addJourneyToDb } = require('../utils/addJourneyToDb');
const { getJourneysFromFile } = require('../utils/getJourneysFromFile');
const { isValidJourney } = require('../utils/validJourney');

const journeysRouter = require('express').Router();

journeysRouter.post('/page/:page', async (req, res) => {
	const params = req.body;
	let limit = 20;
	let offset = 0;
	let data = '';

	if (params.limit) limit = params.limit;
	if (req.params.page > 0) offset = limit * (req.params.page - 1);
	try {
		if (params.query_term) {
			data = await db.query(
				`SELECT
				id, departure_time AS departure, return_time AS return, departure_station_id AS "departureStationId", departure_station_name AS "departureStationName", return_station_id
	 AS "returnStationId", return_station_name AS "returnStationName", covered_distance_meters AS "coveredDistanceMeters", duration_seconds AS "durationSeconds"
	 FROM journeys WHERE (departure_station_name || return_station_name) ILIKE ($2) LIMIT $1 OFFSET $3`,
				[limit, '%' + params.query_term + '%', offset]
			);
		} else if (params.station) {
			data = await db.query(
				`SELECT
				id, departure_time AS departure, return_time AS return, departure_station_id AS "departureStationId", departure_station_name AS "departureStationName", return_station_id
	 AS "returnStationId", return_station_name AS "returnStationName", covered_distance_meters AS "coveredDistanceMeters", duration_seconds AS "durationSeconds"
	 FROM journeys WHERE departure_station_name = $2 LIMIT $1  OFFSET $3`,
				[limit, params.station, offset]
			);
		} else {
			data = await db.query(
				`SELECT
				id, departure_time AS departure, return_time AS return, departure_station_id AS "departureStationId", departure_station_name AS "departureStationName", return_station_id
	 AS "returnStationId", return_station_name AS "returnStationName", covered_distance_meters AS "coveredDistanceMeters", duration_seconds AS "durationSeconds"
	 FROM journeys
	 LIMIT $1 OFFSET $2`,
				[limit, offset]
			);
		}
		res.status(200).json(data);
	} catch (e) {
		console.log(e);
	}
});

// get all filtered journeys from db
journeysRouter.post('/', async (req, res) => {
	const params = req.body;
	let limit = 20;
	let data = '';

	if (params.limit) limit = params.limit;
	try {
		if (params.query_term) {
			data = await db.query(
				`SELECT count(*) OVER() AS full_count,
				id, departure_time AS departure, return_time AS return, departure_station_id AS "departureStationId", departure_station_name AS "departureStationName", return_station_id
	 AS "returnStationId", return_station_name AS "returnStationName", covered_distance_meters AS "coveredDistanceMeters", duration_seconds AS "durationSeconds"
	 FROM journeys WHERE (departure_station_name || return_station_name) ILIKE ($2) LIMIT $1`,
				[limit, '%' + params.query_term + '%']
			);
		} else if (params.station) {
			data = await db.query(
				`SELECT count(*) OVER() AS full_count,
				id, departure_time AS departure, return_time AS return, departure_station_id AS "departureStationId", departure_station_name AS "departureStationName", return_station_id
	 AS "returnStationId", return_station_name AS "returnStationName", covered_distance_meters AS "coveredDistanceMeters", duration_seconds AS "durationSeconds"
	 FROM journeys WHERE departure_station_name = $2 LIMIT $1`,
				[limit, params.station]
			);
		} else {
			data = await db.query(
				`SELECT count(*) OVER() AS full_count,
				id, departure_time AS departure, return_time AS return, departure_station_id AS "departureStationId", departure_station_name AS "departureStationName", return_station_id
	 AS "returnStationId", return_station_name AS "returnStationName", covered_distance_meters AS "coveredDistanceMeters", duration_seconds AS "durationSeconds"
	 FROM journeys
	 LIMIT $1`,
				[limit]
			);
		}
		res.status(200).json(data);
	} catch (e) {
		console.log(e);
	}
});

journeysRouter.get('/populateDatabase', async (req, res) => {
	try {
		const allJourneys = await getJourneysFromFile(
			'./assets/journey_data/2021-05.csv'
		);

		allJourneys.forEach(async (journey) => {
			if (isValidJourney(journey)) {
				await addJourneyToDb(journey);
			}
		});
		res.status(200).json({ msg: 'Populated database with valid journeys' });
	} catch (e) {
		console.log('Database journeys population error: ', e);
		res.status(200).json({ error: 'Database population encountered an error' });
	}
});

module.exports = journeysRouter;
