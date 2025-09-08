import dotenv from 'dotenv'
import express from 'express'
dotenv.config()
import DocumentRouter from './routes/DocumentRoutes.js'
import CategoryRouter from './routes/CategoryRoutes.js'
import cors from 'cors'
const PORT = 3000
const app = express()
app.use(cors({
  origin: '*', // front hospedado na Vercel
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json())

app.use('/document', DocumentRouter)
app.use('/category', CategoryRouter)

app.use("/", (_req, res) => {
  res.status(200).json({ msg: "Ok" })
})
app.listen(PORT, () => {
  console.log("Servidor Rodando na porta: " + PORT)

})