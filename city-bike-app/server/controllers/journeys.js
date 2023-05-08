const { addJourneyToDb } = require('../utils/addJourneyToDb');
const { getJourneysFromFile } = require('../utils/getJourneysFromFile');
const { isValidJourney } = require('../utils/validJourney');

const journeysRouter = require('express').Router();

// get all journeys from file to console
journeysRouter.get('/', async (req, res) => {
	try {
		const allJourneys = await getJourneysFromFile(
			'./assets/journey_data/2021-01.csv'
		);
		console.log(allJourneys);
		res.status(200).json(allJourneys);
	} catch (e) {
		console.log(e);
	}
});

journeysRouter.get('/populateDatabase', async (req, res) => {
	try {
		const allJourneys = await getJourneysFromFile(
			'./assets/journey_data/2021-01.csv'
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
