import express from 'express'
import DocumentController from '../controllers/DocumentController.js'
const DocumentRouter = express.Router()

DocumentRouter.post("/insertDoc", DocumentController.insertDoc)
DocumentRouter.get('/getLatestDocs', DocumentController.getLatestDocs)
DocumentRouter.post('/getDocsByCategorieId', DocumentController.getDocsByCategorieId)
DocumentRouter.post('/getDocsByCategorieIdAndDate', DocumentController.getDocsByCategorieIdAndDate)
DocumentRouter.post('/delete', DocumentController.delete)

export default DocumentRouter