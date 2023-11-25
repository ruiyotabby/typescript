import axios from 'axios';
import { FlightDiary } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAll = () =>
	axios
		.get<FlightDiary[]>(baseUrl)
		.then((response) => response.data)
		.catch((err) => err);
