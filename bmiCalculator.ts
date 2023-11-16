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

console.log(calculateBmi(172, 53));
