import dotenv from 'dotenv'
import express from 'express'
dotenv.config()
import DocumentRouter from './routes/DocumentRoutes.js'
import CategoryRouter from './routes/CategoryRoutes.js'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/document', DocumentRouter)
app.use('/category', CategoryRouter)

app.listen(3030, () => {
    console.log("Servidor Rodando")
})