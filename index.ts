import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise, exerciseValues } from './exerciseCalculator';
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

app.post('/exercises', (req, res) => {
  const dailyExercise: exerciseValues = req.body;
  const { dailyExercises, target } = dailyExercise

	if (!dailyExercises || !target) {
		 res.status(400).json({ error: 'parameters missing' });
	} else if (
		isNaN(Number(target)) ||
		!(dailyExercises instanceof Array) ||
		!dailyExercises.every((exercise) => !isNaN(Number(exercise)))
	) {
		 res.status(400).json({ error: 'malformatted parameters' });
  }
  console.log('doooooooone');

	res.json(calculateExercise(dailyExercises, target));
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
