import DocumentModel from "../model/DocumentModel.js";
import chalk from "chalk";
chalk.level = 3
class DocumentController {
    async insertDoc(req, res) {
        try {
            console.log(chalk.blue.bgWhite.bold('[Document Controller]') + ' Iniciando inserção de documento')

            const { dateValue, descriptionValue, categoryValue, priceValue, docNumberValue } = req.body

            if (!dateValue || !descriptionValue || !categoryValue || !priceValue) {
                console.log(chalk.red('[Document Controller]') + ' Dados inválidos recebidos para inserção')
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

            console.log(chalk.green('[Document Controller]') + ' Documento inserido com sucesso:', JSON.stringify(newDoc))

            return res.status(201).json({
                success: true,
                newDoc
            })

        } catch (err) {
            if (err.code === '23505') {
                console.log(chalk.red('[Document Controller]') + ' Violação de chave única detectada (doc_number duplicado)')
                return res.status(409).json({ success: false, message: 'Número de nota já cadastrado.' })
            }
            console.error(chalk.red('[Document Controller]') + ' Erro ao inserir documento:', err)
            return res.status(500).json({ message: 'Erro ao criar documento', error: err.message })
        }
    }

    async getLatestDocs(_, res) {
        try {
            console.log(chalk.blue.bgWhite.bold('[Document Controller]') + ' Requisição recebida para buscar últimos documentos')

            const latestDocs = await DocumentModel.getLatestDocs()

            latestDocs.forEach(doc => {
                let formattedDate = doc.date.toISOString().split('T')[0]
                doc.date = formattedDate
            })

            console.log(chalk.green('[Document Controller]') + ` Últimos documentos recuperados: ${latestDocs.length}`)

            return res.status(200).json({
                success: true,
                latestDocs
            })

        } catch (err) {
            console.error(chalk.red('[Document Controller]') + ' Erro ao buscar últimas notas:', err)
            return res.status(500).json({ success: false, message: 'Erro ao buscar últimas notas' })
        }
    }
}

export default new DocumentController()