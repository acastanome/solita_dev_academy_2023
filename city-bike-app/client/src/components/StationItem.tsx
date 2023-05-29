import Station from '../types/station';

const StationItem: React.FC<{ station: Station }> = (props) => {
	return (
		<li className='max-w-screen-md h-max text-blue-950 py-2 px-4 rounded border md:border-blue-300 hover:bg-blue-100'>
			<ul>
				<li>
					<b>Station name: </b>
					{props.station.name}
				</li>
				<li>
					<b>Address: </b>
					{props.station.osoite}
				</li>
				<li>
					<b>City: </b>
					{props.station.kaupunki}
				</li>
				<li>
					<b>Capacity: </b>
					{props.station.kapasiteet}
				</li>
			</ul>
		</li>
	);
};

export default StationItem;
