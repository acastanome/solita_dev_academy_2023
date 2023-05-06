const express = require('express');
const app = express();
const cors = require('cors');
const { getJourneysFromFile } = require('./utils/getJourneysFromFile');

require('dotenv').config();

// Routes
const stationsRouter = require('./controllers/stations');
// const journeysRouter = require('./controllers/journeys');

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/stations', stationsRouter);
// app.use('/journeys', journeysRouter);

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

module.exports = app;
