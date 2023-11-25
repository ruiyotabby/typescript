import { useEffect, useState } from 'react';
import { getAll } from './services/flight-diary';
import { FlightDiary } from './types';

function App() {
	const [flightDiaries, setFlightDiaries] = useState<FlightDiary[]>([]);

	useEffect(() => {
		getAll().then((diaries: FlightDiary[]) => setFlightDiaries(diaries));
	}, []);

	return (
		<>
			<h3>Diary Entries</h3>
			{flightDiaries.map((diary) => (
				<div key={diary.id}>
					<p>
						<strong>{diary.date}</strong>
					</p>
					<div>
						<div>visibility: {diary.visibility}</div>
						<div>weather: {diary.weather}</div>
					</div>
				</div>
			))}
		</>
	);
}

export default App;
