import express from 'express'
import { getAllData, getDataByPathParams, addData, updateData , deleteData } from '../controllers/startupDataController.js'



export const apiRouter = express.Router()

apiRouter.get('/', getAllData)

apiRouter.get('/:field/:term', getDataByPathParams)


apiRouter.post('/post', addData)

apiRouter.put('/post/:id', updateData)

apiRouter.delete('/post/:id', deleteData )