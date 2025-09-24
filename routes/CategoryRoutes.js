import express from 'express'
import CategoryController from '../controllers/CategoryController.js'
const CategoryRouter = express.Router()

CategoryRouter.get('/getAll', CategoryController.getAll)
CategoryRouter.get('/getAllWithTotals', CategoryController.getAllWithTotals)

export default CategoryRouter