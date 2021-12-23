interface bmiValue {
    height: number,
    weight: number
}
const parseArgumentsBmi = (args: Array<string>): bmiValue => {
    if(args.length < 4) throw new Error("Too few arguments")
    if(args.length > 4) throw new Error("Too many arguments")
    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    }
    else throw new Error("Some arguments are not number!")
}

const calculateBmi = (a: number, b:number) => {
    a = a/100
    const result = b/(a*a)
    if(result < 16) return "Underweight (Severe thinness)"
    if(result>=16 && result <=16.9) return "Underweight (Moderate thinness)"
    if(result>=17 && result <=18.4) return"Underweight (Mild thinness)"
    if(result>=18.5 && result<=24.9) return "Normal range"
    if(result>=25 && result<=29.9) return"Overweight (Pre-obese)"
    if(result>=30 && result<=34.9) return"Obese (Class I)"
    if(result>=35 && result<=39.9) return"Obese (Class II)"
    return "Obese (Class III)"
}

try {
    const {height, weight} = parseArgumentsBmi(process.argv)
    console.log(calculateBmi(height, weight))
} catch(error) {
    let e = "Something bad happened. "
    if(error instanceof Error) {
        e += "Error: " + error.message
    }
    console.log(e)
}