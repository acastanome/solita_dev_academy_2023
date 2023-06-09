import { Navigate, Route, Routes, useMatch } from 'react-router-dom';
import Landing from './routes/Landing';
import Journeys from './routes/Journeys';
import Stations from './routes/Stations';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import StationPage from './routes/StationPage';

const App = () => {
	const match = useMatch('/stations/:id');
	const stationId = match ? match.params.id : '';

	return (
		<div>
			<Navbar />
			<Toaster position='top-center' reverseOrder={false} />
			<Routes>
				<Route path='/journeys' element={<Journeys />} />
				<Route path='/stations' element={<Stations />} />
				<Route path='/stations/:id' element={<StationPage id={stationId} />} />
				<Route path='/' element={<Landing />} />
				<Route path='*' element={<Navigate replace to='/' />} />
			</Routes>
		</div>
	);
};

export default App;
