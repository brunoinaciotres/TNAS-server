import express from 'express'
import CategoryController from '../controllers/CategoryController.js'
const CategoryRouter = express.Router()

CategoryRouter.get('/getAll', CategoryController.getAll)
CategoryRouter.get('/getAllWithTotals', CategoryController.getAllWithTotals)
CategoryRouter.post('/create', CategoryController.create)
CategoryRouter.post('/delete', CategoryController.delete)

export default CategoryRouter