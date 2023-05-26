import Journey from '../types/journey';
import JourneyItem from './JourneyItem';

const JourneysList: React.FC<{ journeys: Journey[] }> = (props) => {
	return (
		<ul className='flex flex-col space-y-1 p-1 self-center'>
			{props.journeys.map((j, index) => (
				<JourneyItem journey={j} key={index}></JourneyItem>
			))}
		</ul>
	);
};

export default JourneysList;
