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


    async getDocsByCategorieId(req, res) {
        try {
            const { id } = req.body
            const docs = await DocumentModel.getDocsByCategorieId(id)

            if (docs) {

                docs.forEach(doc => {
                    let formattedDate = doc.date.toISOString().split('T')[0]
                    doc.date = formattedDate
                })
                return res.status(200).json({
                    success: true,
                    docs
                })
            }

            return res.status(200).json("Não há notas")


        } catch (e) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar documentos', error: e })
        }
    }

    async getDocsByCategorieIdAndDate(req, res) {
        try {
            const { categoryId, month, year } = req.body
            if (!categoryId) return res.status(400).json({ success: false, msg: "Category ID não pode ser nulo" })
            const docs = await DocumentModel.getDocsByCategorieIdAndDate(categoryId, month, year)

            if (docs.length > 0) {
                return res.status(200).json({
                    success: true,
                    docs
                })
            }

             return res.status(200).json({
                    success: true,
                    docs: [],
                    msg:"Nenhum documento encontrado"
                })


        } catch (e) {
            console.log(e)
        }
    }
}



export default new DocumentController()