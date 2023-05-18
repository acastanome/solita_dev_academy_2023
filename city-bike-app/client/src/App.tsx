import './App.css';
import JourneyItem from './components/JourneyItem';
import JourneysList from './components/JourneysList';
import Journey from './types/journey';

const App = () => {
	const journey1 = {
		departure: new Date('2021-05-31 23:52:03'),
		return: new Date('2021-06-01 00:15:16'),
		departureStationId: 116,
		departureStationName: 'Linnanmäki',
		returnStationId: 117,
		returnStationName: 'Brahen puistikko',
		coveredDistanceMeters: 3344,
		durationSeconds: 1393,
	};

	const journey2 = {
		departure: new Date('2021-05-31 23:52:03'),
		return: new Date('2021-06-01 00:15:16'),
		departureStationId: 116,
		departureStationName: 'Linnanmäki2',
		returnStationId: 117,
		returnStationName: 'Brahen puistikko3',
		coveredDistanceMeters: 3344,
		durationSeconds: 1393,
	};

	let allJourneys: Journey[];
	// allJourneys = [];
	allJourneys = [journey1, journey2];

	return (
		<div>
			<p>List of journeys:</p>
			<JourneysList journeys={allJourneys}></JourneysList>
		</div>
	);
};

export default App;
