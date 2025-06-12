import express from 'express'
import { apiRouter } from './routes/apiRoutes.js'
import cors from 'cors'

const PORT = process.env.PORT || 8444

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended :false}))

app.use('/api', apiRouter)

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found. Please check the API documentation." })
})

app.listen(PORT, () => console.log(`server connected on port ${PORT}`))