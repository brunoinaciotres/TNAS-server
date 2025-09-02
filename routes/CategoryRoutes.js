import express from 'express'
import CategoryController from '../controllers/CategoryController.js'
const CategoryRouter = express.Router()

CategoryRouter.get('/getAll', CategoryController.getAll)

export default CategoryRouter