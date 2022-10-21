import express, { Request, Response } from 'express'
import path from 'path'

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req: Request, res: Response): void => {
  const age: number = 39;
  res.json({ message: `I am ${age} years old` })
})

app.get('/hello', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Hello! How are you?' })
})

app.listen(PORT, (): void => {
  console.log(`Server listening on port: ${PORT}`)
})