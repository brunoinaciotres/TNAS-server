import DocumentModel from "../model/DocumentModel.js";

class DocumentController {
    async insertDoc(req, res) {
        try {
            const { dateValue, descriptionValue, categoryValue, priceValue, docNumberValue } = req.body

            if (!dateValue || !descriptionValue || !categoryValue || !priceValue) {
                return res.status(400).json({
                    success: false,
                    message: 'Todos os campos obrigatórios devem ser preenchidos.'
                })
            }

            function transformIntoCents(money) {
                return Number(money) * 100
            }

            const docData = {
                dateValue,
                descriptionValue,
                categoryValue,
                priceValue: transformIntoCents(priceValue),
                docNumberValue,
                isFiscalDoc: docNumberValue ? 1 : 0
            }

            const newDoc = await DocumentModel.create(docData)

            return res.status(201).json({
                success: true,
                newDoc
            })

        } catch (err) {
            if (err.code === '23505') {
                return res.status(409).json({ success: false, message: 'Número de nota já cadastrado.' })
            }
            return res.status(500).json({ message: 'Erro ao criar documento', error: err.message })
        }
    }

    async getLatestDocs(_, res) {
        try {

            const latestDocs = await DocumentModel.getLatestDocs()

            latestDocs.forEach(doc => {
                let formattedDate = doc.date.toISOString().split('T')[0]
                doc.date = formattedDate
            })


            
            return res.status(200).json({
                success: true,
                latestDocs
            })

        } catch (err) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar últimas notas' })
        }
    }

    
    async getDocsByCategorieId(req, res){
        try {
            const {id} = req.body

            const docs = await DocumentModel.getDocsByCategorieId(id)

            return res.status(200).json({
                success: true,
                docs
            })
        } catch (e) {
             return res.status(500).json({ success: false, message: 'Erro ao buscar documentos', error:e })
        }
    }
}

export default new DocumentController()