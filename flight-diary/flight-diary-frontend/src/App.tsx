import { useEffect, useState } from 'react';
import { addDiary, getAll } from './services/flight-diary';
import { FlightDiary } from './types';
import axios from 'axios';

function App() {
	const [flightDiaries, setFlightDiaries] = useState<FlightDiary[]>([]);
	const [date, setDate] = useState('');
	const [visibility, setVisibility] = useState('');
	const [weather, setWeather] = useState('');
	const [comment, setComment] = useState('');
	const [message, setMessage] = useState('');

	useEffect(() => {
		getAll().then((diaries: FlightDiary[]) => setFlightDiaries(diaries));
	}, []);

	const diaryCreation = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		try {
			const response = await addDiary({ date, visibility, weather, comment });
			setFlightDiaries(flightDiaries.concat(response));

			[setComment, setDate, setVisibility, setWeather].forEach((input) =>
				input('')
			);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setMessage(error.response!.data);
			} else {
				console.log(error);
			}
		}
	};

	return (
		<>
			<h3>Add new diary</h3>
			<p style={{ color: 'red' }}>{message}</p>
			<form onSubmit={diaryCreation}>
				<label htmlFor='date'>date: </label>
				<input
					id='date'
					type='date'
					value={date}
					onChange={({ target }) => setDate(target.value)}
				/>
				<br />
				<label htmlFor='visibility'>visibility: </label>
				<input
					id='visibility'
					type='tesxt'
					value={visibility}
					onChange={({ target }) => setVisibility(target.value)}
				/>
				<br />
				<label htmlFor='weather'>weather: </label>
				<input
					id='weather'
					type='text'
					value={weather}
					onChange={({ target }) => setWeather(target.value)}
				/>
				<br />
				<label htmlFor='comment'>comment: </label>
				<input
					id='comment'
					type='text'
					value={comment}
					onChange={({ target }) => setComment(target.value)}
				/>
				<br />
				<button type='submit'>add</button>
			</form>
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
