import express from 'express'
import CaixaController from '../controllers/CaixaController.js'


const CaixaRouter= express.Router()

CaixaRouter.get('/getCurrentMonth', CaixaController.getActualMonthVendas)

export default CaixaRouter