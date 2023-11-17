export const calculateBmi =  (height: number, weight: number): string => {
  const bmi: number = weight/((height/100)**2)
  switch(true) {
    case bmi < 18.5:
      return 'Underweight'
    case 25 < bmi && bmi > 18.5:
      return 'normal weight'
    case bmi > 25:
      return 'overweight'
    default:
      return 'some error occured'
  }
}

interface bmiValues {
  value1: number,
  value2: number
}

const parseArguments = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  if (isNaN(Number(args[2])) && isNaN(Number(args[3]))) {
    throw new Error("provided values were not numbers");
  }
  return {
    value1: Number(args[2]),
    value2: Number(args[3])
  }
}

try {
  const { value1, value2 } = parseArguments(process.argv)
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage: string = 'some error happened. ';
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message
  }
  console.log(errorMessage);

}