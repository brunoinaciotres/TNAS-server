import express from 'express'
import CardMachineController from '../controllers/CardMachineController.js'


const CardMachineRouter = express.Router()

CardMachineRouter.post('/insert',CardMachineController.insertNewCardMachine )
CardMachineRouter.get('/getAll',CardMachineController.getAllMachines )
CardMachineRouter.delete('/delete', CardMachineController.deleteMachine)
CardMachineRouter.put('/update', CardMachineController.updateMachine)

export default CardMachineRouter