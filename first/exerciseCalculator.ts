interface exerciseCal {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface ExerValues {
    target: number,
    exerciseHours: Array<number>
}

const parseArguments = (args: Array<string>): ExerValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const exerciseHours = args.slice(3, args.length).map(n => Number(n))
    const target = Number(args[2])
    const check = exerciseHours.map(n => isNaN(n))
    if(check.includes(false) && !isNaN(target)) return {target, exerciseHours}
    else throw new Error("Some of arguments are not number")    
}

const exerciseCal = ( target: number, exerciseHours: Array<number>): exerciseCal => {
    const periodLength = exerciseHours.length
    const trainingDays = exerciseHours.filter(n => n>0).length
    const average = (exerciseHours.reduce((a, b) => (a+b)))/periodLength
    const success = average >= target
    let rating, ratingDescription
    if(average < target) {
        rating = 1
        ratingDescription = "not too bad but could be better"
    }
    else if (average === target) {
        rating = 2 
        ratingDescription = "ok"
    }
    else {
        rating = 3
        ratingDescription = "good"
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}
try {
const {target, exerciseHours} = parseArguments(process.argv)
console.log(exerciseCal(target, exerciseHours))
} catch (error) {
    let e = "Something bad happened. "
    if(error instanceof Error) {
        e += "Error: " + error.message
    }
    console.log(e)
}