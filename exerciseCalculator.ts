interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

export interface exerciseValues {
	target: number;
	dailyExercises: number[];
}

const parseArguments = (args: string[]): exerciseValues => {
	if (args.length <= 3) throw new Error('Not enough arguments');

	const values: string[] = args.slice(3);

	if (
		isNaN(Number(args[2])) ||
		!values.every((value) => !isNaN(Number(value)))
	) {
		throw new Error('provided values were not numbers');
	} else {
		return {
			target: Number(args[2]),
			dailyExercises: args.splice(3).map((i) => Number(i)),
		};
	}
};

export const calculateExercise = (
	dailyExercises: number[],
	target: number
): Result => {
	const result: Result = {
		target,
		periodLength: dailyExercises.length,
		trainingDays: dailyExercises.filter((dailyExercise) => dailyExercise !== 0)
			.length,
		average:
			dailyExercises.reduce(
				(accumulator, currentValue) => accumulator + currentValue
			) / dailyExercises.length,
		success: false,
		rating: 0,
		ratingDescription: 'nothing',
	};
	result.success = result.average >= result.target;
	result.rating =
		result.average >= result.target ? 3 : result.average <= 1 ? 1 : 2;
	result.ratingDescription =
		result.rating === 3
			? 'Good work keep it up'
			: result.rating === 2
			? 'not too bad but could be better'
			: 'Pull up your socks';
	return result;
};

try {
	const { dailyExercises, target } = parseArguments(process.argv);
	console.log(calculateExercise(dailyExercises, target));
} catch (error: unknown) {
	let errorMessage: string = 'Something bad happened.';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}
