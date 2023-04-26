const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

app.get('/test', (req, res) => {
	res.json({ message: 'Testing: Server is up' });
});

// START get data
const csv = require('csv-parser');
const fs = require('fs');

const results = [];

fs.createReadStream('./assets/journey_data/2021-01.csv')
	.pipe(csv({}))
	.on('data', (data) => results.push(data))
	.on('error', (e) => console.log(e))
	.on('end', () => console.log(results));
// END get data

server.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
