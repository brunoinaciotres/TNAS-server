import express from 'express'
import VendasDiariasController from '../controllers/VendasDiariasController.js'

const VendasDiariasRouter = express.Router()

VendasDiariasRouter.post('/insertNewVenda', VendasDiariasController.insertNewVenda)
VendasDiariasRouter.post('/getVendasByDate', VendasDiariasController.getVendasByDate)

export default VendasDiariasRouter