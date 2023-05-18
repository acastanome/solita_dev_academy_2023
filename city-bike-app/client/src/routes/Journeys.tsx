import { useState } from 'react';
import JourneysList from '../components/JourneysList';

const Journeys = () => {
	// const journey1 = {
	// 	departure: new Date('2021-05-31 23:52:03'),
	// 	return: new Date('2021-06-01 00:15:16'),
	// 	departureStationId: 116,
	// 	departureStationName: 'Linnanmäki',
	// 	returnStationId: 117,
	// 	returnStationName: 'Brahen puistikko',
	// 	coveredDistanceMeters: 3344,
	// 	durationSeconds: 1393,
	// };

	// const journey2 = {
	// 	departure: new Date('2021-05-31 23:52:03'),
	// 	return: new Date('2021-06-01 00:15:16'),
	// 	departureStationId: 116,
	// 	departureStationName: 'Linnanmäki2',
	// 	returnStationId: 117,
	// 	returnStationName: 'Brahen puistikko3',
	// 	coveredDistanceMeters: 3344,
	// 	durationSeconds: 1393,
	// };

	// let allJourneys: Journey[];
	// // allJourneys = [];
	// allJourneys = [journey1, journey2];

	const [allJourneys, setAllJourneys] = useState([]);

	// useEffect(() => {
	// 	const getAllJourneys = async () => {
	// 		const allJ = await journeysService.getAllJourneys();
	// 		console.log(allJ);
	// 	};
	// }, []);
	return (
		<div className='flex flex-col h-screen'>
			<p>List of journeys:</p>
			<JourneysList journeys={allJourneys} />
		</div>
	);
};

export default Journeys;
