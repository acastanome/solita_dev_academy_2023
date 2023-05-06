const db = require('../db');
const { addStationToDb } = require('../utils/addStationToDb');
const { getStationsFromFile } = require('../utils/getStationsFromFile');
const { validateSatation } = require('../utils/validateStation');

const stationsRouter = require('express').Router();

//get all stations from file
stationsRouter.get('/', async (req, res) => {
	try {
		const allStations = await getStationsFromFile(
			'./assets/bike_stations_data/Helsingin_ja_Espoon_asemat_avoin.csv'
		);
		res.status(200).json(allStations);
	} catch (e) {
		console.log(e);
	}
});

// TODO: for now takes example station from file, change to station from request
stationsRouter.post('/addStation', async (req, res) => {
	try {
		const allStations = await getStationsFromFile(
			'./assets/bike_stations_data/Helsingin_ja_Espoon_asemat_avoin.csv'
		);
		// const data = req.body;
		// console.log(allStations[5]);
		const station = await allStations.filter((s) => s.ID === 733);
		const valid = await validateSatation(station[0]);
		if (valid === true) {
			const result = await addStationToDb(station[0]);
			if (result.error) {
				res.status(400).json({ error: result.error });
			} else if (result === 1) {
				res.status(201).json({ msg: 'Station added succesfully' });
			} else {
				res.status(200).json(result);
			}
		} else {
			res.status(400).json({ error: 'Could not add station, missing content' });
		}
	} catch (e) {
		console.log(e);
		res.status(400).json({ error: 'Station could not be added.' });
	}
});

stationsRouter.get('/populateDatabase', async (req, res) => {
	try {
		const allStations = await getStationsFromFile(
			'./assets/bike_stations_data/Helsingin_ja_Espoon_asemat_avoin.csv'
		);

		allStations.forEach(async (station) => {
			await addStationToDb(station);
		});

		res.status(200).json({ msg: 'Populated database with valid stations' });
	} catch (e) {
		console.log('Database population error: ', e);
		res.status(200).json({ error: 'Database population encountered an error' });
	}
});

module.exports = stationsRouter;
