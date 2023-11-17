import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
	const { height, weight } = req.query;

	if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
		res.status(400).json({ error: 'malformatted parameters' });
	}

	res.json({
		height: Number(height),
		weight: Number(weight),
		bmi: calculateBmi(Number(height), Number(weight)),
	});
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
