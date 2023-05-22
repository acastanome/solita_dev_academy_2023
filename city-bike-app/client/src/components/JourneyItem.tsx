import Journey from '../types/journey';

const JourneyItem: React.FC<{ journey: Journey }> = (props) => {
	const distanceKm = Math.floor(props.journey.coveredDistanceMeters / 1000);
	const durationMin = Math.floor(props.journey.durationSeconds / 60);
	return (
		<li>
			<ul>
				<li>
					<b>Departure station name: </b>
					{props.journey.departureStationName}
				</li>
				<li>
					<b>Return station name:</b>
					{props.journey.returnStationName}
				</li>
				<li>
					<b>Distance km: </b>
					{distanceKm}
				</li>
				<li>
					<b>Duration min: </b>
					{durationMin}
				</li>
			</ul>
		</li>
	);
};

export default JourneyItem;