import { Navigate, Route, Routes } from 'react-router-dom';
import Landing from './routes/Landing';
import Journeys from './routes/Journeys';
import Stations from './routes/Stations';
import Navbar from './components/Navbar';

const App = () => {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path='/journeys' element={<Journeys />} />
				{/* <Route path='/stations' element={<Stations />} /> */}
				{/* <Route path='/journeys/:id' element={<JourneyPage id={journeyId} />} />
				<Route path='/stations/:id' element={<StationPage id={stationId} />} /> */}
				<Route path='/' element={<Landing />} />
				<Route path='*' element={<Navigate replace to='/' />} />
			</Routes>
		</div>
	);
};

export default App;
