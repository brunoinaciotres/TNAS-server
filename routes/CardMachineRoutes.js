import express from 'express'
import CardMachineController from '../controllers/CardMachineController.js'


const CardMachineRouter = express.Router()

CardMachineRouter.get('/insert',CardMachineController.insertNewCardMachine )
CardMachineRouter.get('/getAll',CardMachineController.getAllMachines )


export default CardMachineRouter