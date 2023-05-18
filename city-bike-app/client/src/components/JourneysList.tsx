import Journey from '../types/journey';
import JourneyItem from './JourneyItem';

const JourneysList: React.FC<{ journeys: Journey[] }> = (props) => {
	return (
		<ul>
			{props.journeys.map((j, index) => (
				<JourneyItem journey={j} key={index}></JourneyItem>
			))}
		</ul>
	);
};

export default JourneysList;
