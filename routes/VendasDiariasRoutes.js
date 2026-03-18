import express from 'express'
import VendasDiariasController from '../controllers/VendasDiariasController.js'

const VendasDiariasRouter = express.Router()

VendasDiariasRouter.post('/insertNewVenda', VendasDiariasController.insertNewVenda)

export default VendasDiariasRouter