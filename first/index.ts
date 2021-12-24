import { parseArgumentsBmi, calculateBmi } from "./calculateBmi";

const express = require('express');
const app = express();

app.get('/hello', (_req: any, res: any) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: any, res: any) => {
    const weightQ = req.query.weight
    const heightQ = req.query.height
    if(!weightQ || !heightQ) {
        res.status(400)
        res.send({
            error: "missing parameters"
        })
    } else {
        try{
        const {weight, height} = parseArgumentsBmi(
            Number(heightQ),
            Number(weightQ)
        )
        res.send({
            weight: weight,
            height: height,
            bmi: calculateBmi(height, weight)
        })
        } catch(error) {
            res.status(400)
            res.send({
                error: "malformatted parameters"
            })
        }
    }
})

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});