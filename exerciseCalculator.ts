interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface exerciseValues {
  value1: number,
  value2: number[]
}

const parseArguments = (args: string[]): exerciseValues => {
  if (args.length <= 3) throw new Error('Not enough arguments')

  const values: string[] = args.slice(3)

  if (isNaN(Number(args[2])) || !values.every(value => !isNaN(Number(value)))) {
    throw new Error("provided values were not numbers");
  } else {
    return {
      value1: Number(args[2]),
      value2: args.splice(3).map(i => Number(i))
    }
  }
}

export const calculateExercise = (dailyExercises: number[], target: number): Result => {
  let result : Result = {
    target,
    periodLength: dailyExercises.length,
    trainingDays: dailyExercises.filter(dailyExercise => dailyExercise !== 0).length,
    average: (dailyExercises.reduce((accumulator, currentValue) => accumulator + currentValue))/dailyExercises.length,
    success: false,
    rating: 0,
    ratingDescription: 'nothing'
  }
  result.success = result.average >= result.target
  result.rating = result.average >= result.target ? 3 : result.average <= 1 ? 1 : 2
  result.ratingDescription = result.rating === 3 ? 'Good work keep it up' : result.rating === 2 ? 'not too bad but could be better' : 'Pull up your socks'
  return result
}

try {
  const { value1, value2 } = parseArguments(process.argv)
  console.log(calculateExercise(value2, value1))
} catch (error: unknown) {
  let errorMessage: string = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage);

}
