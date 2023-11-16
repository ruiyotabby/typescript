interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercise = (dailyExercises: number[], target: number): object => {
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

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2))
