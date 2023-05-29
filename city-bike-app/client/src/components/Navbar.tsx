import { useNavigate } from 'react-router-dom';

const Navbar = () => {
	const navigate = useNavigate();

	const navigateJourneys = () => {
		navigate('/journeys');
	};

	const navigateStations = () => {
		navigate('/stations');
	};
	return (
		<div className='flex flex-row space-x-1 p-1'>
			<button
				className='w-32 md:h-16 text-blue-950 font-bold py-2 px-4 rounded border md:border-blue-300 hover:bg-blue-300'
				onClick={navigateJourneys}
			>
				Journeys
			</button>
			<button
				className='w-32 md:h-16 text-blue-950 font-bold py-2 px-4 rounded border md:border-blue-300 hover:bg-blue-300'
				onClick={navigateStations}
			>
				Stations
			</button>
		</div>
	);
};

export default Navbar;
