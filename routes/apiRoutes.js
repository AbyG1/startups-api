import express from 'express'
import { getAllData } from '../controllers/getAllData.js'
import { getDataByPathParams } from '../controllers/getDataByPathParams.js'
import { addData } from '../controllers/addData.js'

export const apiRouter = express.Router()

apiRouter.get('/', getAllData)

apiRouter.get('/:field/:term', getDataByPathParams)


apiRouter.post('/post', addData)