import express from 'express'
import CaixaController from '../controllers/CaixaController.js'


const CaixaRouter= express.Router()

CaixaRouter.get('/getCurrentMonth', CaixaController.getActualMonthVendas)
CaixaRouter.post('/insertNewVendaCaixaDinheiro', CaixaController.insertNewVendaCaixaDinheiro)
CaixaRouter.post('/insertNewVendaCaixaCartao', CaixaController.insertNewVendaCaixaCartao)
CaixaRouter.post('/insertNewCaixa', CaixaController.insertNewCaixa)
CaixaRouter.post('/getCaixaByDate', CaixaController.getCaixaByDate)
CaixaRouter.delete('/deleteCaixaByDate', CaixaController.deleteCaixaByDate)
CaixaRouter.post('/getCaixaByMonthAndYear', CaixaController.getCaixaByMonthAndYear)

export default CaixaRouter