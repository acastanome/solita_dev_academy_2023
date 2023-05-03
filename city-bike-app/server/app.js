const express = require('express');
const app = express();
const cors = require('cors');
const { getJourneysFromFile } = require('./utils/getJourneysFromFile');
const { getStationsFromFile } = require('./utils/getStationsFromFile');

require('dotenv').config();

const db = require('./db/index');

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.get('/test', (req, res) => {
	res.json({ message: 'Testing: Server is up' });
});

app.get('/journeys', async (req, res) => {
	try {
		const allJourneys = await getJourneysFromFile(
			'./assets/journey_data/2021-01.csv'
		);
		res.status(200).json(allJourneys);
	} catch (e) {
		console.log(e);
	}
});

app.get('/stations', async (req, res) => {
	try {
		const allStations = await getStationsFromFile(
			'./assets/bike_stations_data/Helsingin_ja_Espoon_asemat_avoin.csv'
		);
		res.status(200).json(allStations);
	} catch (e) {
		console.log(e);
	}
});

app.post('/addStation', async (req, res) => {
	const allStations = await getStationsFromFile(
		'./assets/bike_stations_data/Helsingin_ja_Espoon_asemat_avoin.csv'
	);
	// const data = req.body;
	const station = allStations[1];
	// if (
	// 	data.station.ID &&
	// 	data.station.Nimi &&
	// 	data.station.Namn &&
	// 	data.station.Name &&
	// 	data.station.Osoite &&
	// 	data.station.Adress &&
	// 	data.station.Kaupunki &&
	// 	data.station.Stad &&
	// 	data.station.Operaattor &&
	// 	data.station.Kapasiteet &&
	// 	data.station.x &&
	// 	data.station.y
	// ) {
	if (
		station.ID &&
		station.Nimi &&
		station.Namn &&
		station.Name &&
		station.Osoite &&
		station.Adress &&
		station.Kaupunki &&
		station.Stad &&
		station.Operaattor &&
		station.Kapasiteet &&
		station.x &&
		station.y
	) {
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
			if (result.rowCount === 1) {
				res.status(201).json(result.rowCount);
			} else {
				res.status(200).json({ error: 'Could not add station' });
			}
		} catch (e) {
			res.status(200).json({ error: 'Could not add station' });
		}
	}
});

module.exports = app;
