import express from 'express'
import UserController from '../controllers/UserController.js'

const UserRouter = express.Router()

UserRouter.get('/getAllNames', UserController.getAllNames)

export default UserRouter