const http = require('http');
const app = require('./app');
const { getJourneysFromFile } = require('./utils/getJourneysFromFile');

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

app.get('/test', (req, res) => {
	res.json({ message: 'Testing: Server is up' });
});

getJourneysFromFile('./assets/journey_data/2021-01.csv');

server.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
