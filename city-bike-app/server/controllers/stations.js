const db = require('../db');
const { addStationToDb } = require('../utils/addStationToDb');
const { getStationsFromFile } = require('../utils/getStationsFromFile');
const { validateSatation } = require('../utils/validateStation');

const stationsRouter = require('express').Router();

stationsRouter.get('/id/:id', async (req, res) => {
	const stationId = req.params.id;

	if (isNaN(stationId)) {
		return res.status(200).json({ error: 'Id is not a number' });
	} else {
		try {
			const data_station = await db.query(
				`SELECT station_id AS "stationId", nimi, namn, name, osoite, adress, kaupunki, stad, operaattor, kapasiteet, x, y FROM stations WHERE station_id = $1`,
				[stationId]
			);
			const station = data_station.rows[0];

			const data_journey_counts = await db.query(
				`SELECT
				(SELECT count(*) FROM journeys WHERE departure_station_id  = $1) AS departures,
				(SELECT count(*) FROM journeys WHERE return_station_id  = $1) AS returns`,
				[stationId]
			);
			const journey_counts = data_journey_counts.rows[0];

			const data_return_stations = await db.query(
				`SELECT
				popular_return_stations.name,
				popular_return_stations.count
				FROM
				(
					SELECT
					return_station_name AS name,
					count(*) AS count
					FROM journeys
					WHERE departure_station_id  = $1
					GROUP BY name
					ORDER BY count DESC
					LIMIT 5
					) AS popular_return_stations`,
				[stationId]
			);
			const popular_return_stations = data_return_stations.rows;

			const data_departure_stations = await db.query(
				`SELECT
				popular_departure_stations.name,
				popular_departure_stations.count
				FROM
				(
					SELECT
					departure_station_name AS name,
					count(*) AS count
					FROM journeys
					WHERE return_station_id  = $1
					GROUP BY name
					ORDER BY count DESC
					LIMIT 5
					) AS popular_departure_stations`,
				[stationId]
			);
			const popular_departure_stations = data_departure_stations.rows;

			res.status(200).json({
				station,
				journeyCounts: journey_counts,
				popularDepartureStations: popular_departure_stations,
				popularReturnStations: popular_return_stations,
			});
		} catch (e) {
			console.log(e);
		}
	}
});

stationsRouter.get('/', async (req, res) => {
	try {
		const data = await db.query(
			`SELECT station_id AS "stationId", nimi, namn, name, osoite, adress, kaupunki, stad, operaattor, kapasiteet, x, y FROM stations`
		);
		res.status(200).json(data);
	} catch (e) {
		console.log(e);
	}
});

stationsRouter.post('/page/:page', async (req, res) => {
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
				station_id AS "stationId", nimi, namn, name, osoite, adress, kaupunki, stad, operaattor, kapasiteet, x, y FROM stations WHERE (nimi || namn || name || osoite || adress || kaupunki || stad) ILIKE ($2) LIMIT $1 OFFSET $3`,
				[limit, '%' + params.query_term + '%', offset]
			);
		} else if (params.station) {
			data = await db.query(
				`SELECT
				station_id AS "stationId", nimi, namn, name, osoite, adress, kaupunki, stad, operaattor, kapasiteet, x, y FROM stations WHERE name = $2 LIMIT $1 OFFSET $3`,
				[limit, params.station, offset]
			);
		} else {
			data = await db.query(
				`SELECT
				station_id AS "stationId", nimi, namn, name, osoite, adress, kaupunki, stad, operaattor, kapasiteet, x, y FROM stations LIMIT $1 OFFSET $2`,
				[limit, offset]
			);
		}
		res.status(200).json(data);
	} catch (e) {
		console.log(e);
	}
});

// get all filtered stations from db
stationsRouter.post('/', async (req, res) => {
	const params = req.body;
	let limit = 20;
	let data = '';

	if (params.limit) limit = params.limit;

	try {
		if (params.query_term) {
			data = await db.query(
				`SELECT count(*) OVER() AS full_count,
				station_id AS "stationId", nimi, namn, name, osoite, adress, kaupunki, stad, operaattor, kapasiteet, x, y FROM stations WHERE (nimi || namn || name || osoite || adress || kaupunki || stad) ILIKE ($2) LIMIT $1`,
				[limit, '%' + params.query_term + '%']
			);
		} else if (params.station) {
			data = await db.query(
				`SELECT count(*) OVER() AS full_count,
				station_id AS "stationId", nimi, namn, name, osoite, adress, kaupunki, stad, operaattor, kapasiteet, x, y FROM stations WHERE name = $2 LIMIT $1`,
				[limit, params.station]
			);
		} else {
			data = await db.query(
				`SELECT count(*) OVER() AS full_count,
				station_id AS "stationId", nimi, namn, name, osoite, adress, kaupunki, stad, operaattor, kapasiteet, x, y FROM stations LIMIT $1`,
				[limit]
			);
		}
		res.status(200).json(data);
	} catch (e) {
		console.log(e);
	}
});

// // TODO: for now takes example station from file, change to station from request
// stationsRouter.post('/addStation', async (req, res) => {
// 	try {
// 		const allStations = await getStationsFromFile(
// 			'./assets/bike_stations_data/Helsingin_ja_Espoon_asemat_avoin.csv'
// 		);
// 		// const data = req.body;
// 		// console.log(allStations[5]);
// 		const station = await allStations.filter((s) => s.ID === 733);
// 		const valid = await validateSatation(station[0]);
// 		if (valid === true) {
// 			const result = await addStationToDb(station[0]);
// 			if (result.error) {
// 				res.status(400).json({ error: result.error });
// 			} else if (result === 1) {
// 				res.status(201).json({ msg: 'Station added succesfully' });
// 			} else {
// 				res.status(200).json(result);
// 			}
// 		} else {
// 			res.status(400).json({ error: 'Could not add station, missing content' });
// 		}
// 	} catch (e) {
// 		console.log(e);
// 		res.status(400).json({ error: 'Station could not be added.' });
// 	}
// });

stationsRouter.get('/populateDatabase', async (req, res) => {
	try {
		const allStations = await getStationsFromFile(
			'./assets/bike_stations_data/Helsingin_ja_Espoon_asemat_avoin.csv'
		);

		allStations.forEach(async (station) => {
			await addStationToDb(station);
		});

		res.status(200).json({
			msg: 'Populating database with valid stations. Please wait a few minutes',
		});
	} catch (e) {
		console.log('Database population error: ', e);
		res.status(200).json({ error: 'Database population encountered an error' });
	}
});

module.exports = stationsRouter;
