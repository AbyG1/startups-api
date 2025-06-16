import express from 'express'
import { apiRouter } from './routes/apiRoutes.js'
import notFound from './middlewares/notFoundMiddleware.js'
import errorhandler from './middlewares/errorhandlerMiddleware.js'
import cors from 'cors'

const PORT = process.env.PORT || 8444

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended :false}))


app.use('/api', apiRouter)
app.use(notFound)
app.use(errorhandler)

app.listen(PORT, () => console.log(`server connected on port ${PORT}`))