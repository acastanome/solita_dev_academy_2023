import { useNavigate } from 'react-router-dom';
import Station from '../types/station';
import StationItem from './StationItem';

const StationsList: React.FC<{ stations: Station[] }> = (props) => {
	const navigate = useNavigate();

	const handleClick = (id: number) => {
		navigate(`/stations/${id}`);
	};

	return (
		<ul className='flex flex-col space-y-1 p-1 self-center'>
			{props.stations.map((s) => (
				<StationItem
					key={s.stationId}
					station={s}
					onItemClick={handleClick.bind(null, s.stationId)}
				></StationItem>
			))}
		</ul>
	);
};

export default StationsList;
