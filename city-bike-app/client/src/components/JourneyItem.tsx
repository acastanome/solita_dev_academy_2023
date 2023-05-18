import Journey from '../types/journey';

const JourneyItem: React.FC<{ journey: Journey }> = (props) => {
	return <li>{props.journey.departureStationName}</li>;
};

export default JourneyItem;
