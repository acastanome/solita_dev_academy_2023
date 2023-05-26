import Journey from '../types/journey';

const JourneyItem: React.FC<{ journey: Journey }> = (props) => {
	const distanceKm = (props.journey.coveredDistanceMeters / 1000).toFixed(2);
	const durationMin = Math.floor(props.journey.durationSeconds / 60);
	const durationExtraSeconds = (
		props.journey.durationSeconds % 60
	).toLocaleString('en-US', {
		minimumIntegerDigits: 2,
		useGrouping: false,
	});

	return (
		<li className='max-w-screen-md h-max text-blue-950 py-2 px-4 rounded border md:border-blue-300 hover:bg-blue-100'>
			<ul>
				<li>
					<b>Departure station name: </b>
					{props.journey.departureStationName}
				</li>
				<li>
					<b>Return station name: </b>
					{props.journey.returnStationName}
				</li>
				<li>
					<b>Distance km: </b>
					{distanceKm}
				</li>
				<li>
					<b>Duration min: </b>
					{durationMin}:{durationExtraSeconds}
				</li>
			</ul>
		</li>
	);
};

export default JourneyItem;
