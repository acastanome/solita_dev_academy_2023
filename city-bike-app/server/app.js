const express = require('express');
const app = express();
const cors = require('cors');
const { getJourneysFromFile } = require('./utils/getJourneysFromFile');
const { getStationsFromFile } = require('./utils/getStationsFromFile');

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

module.exports = app;
