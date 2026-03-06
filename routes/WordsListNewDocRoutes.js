import express from 'express'
import WordsListNewDocController from '../controllers/WordsListNewDocController.js'


const WordsListNewDocRouter = express.Router()

WordsListNewDocRouter.get('/getAllWords', WordsListNewDocController.getAllWords )
WordsListNewDocRouter.post('/insertOrUpdateNewWord', WordsListNewDocController.insertOrUpdateNewWord )

export default WordsListNewDocRouter