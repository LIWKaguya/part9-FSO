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
console.log(calculateBmi(176, 75))