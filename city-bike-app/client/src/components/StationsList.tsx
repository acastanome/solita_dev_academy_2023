import Station from '../types/station';
import StationItem from './StationItem';

const StationsList: React.FC<{ stations: Station[] }> = (props) => {
	return (
		<ul className='flex flex-col space-y-1 p-1 self-center'>
			{props.stations.map((s, index) => (
				<StationItem station={s} key={index}></StationItem>
			))}
		</ul>
	);
};

export default StationsList;
