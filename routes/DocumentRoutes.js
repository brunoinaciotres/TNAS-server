import express from 'express'
import DocumentController from '../controllers/DocumentController.js'
const DocumentRouter = express.Router()

DocumentRouter.post("/insertDoc", DocumentController.insertDoc)
DocumentRouter.get('/getLatestDocs', DocumentController.getLatestDocs)

export default DocumentRouter