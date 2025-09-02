import * as db from './index.js'
import chalk from 'chalk'


class DocumentModel {
    async create(data) {
        try {
            const query = `
        INSERT INTO documents (date, description, category, price_in_cents, doc_number, is_fiscal_doc)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `
            const values = [
                data.dateValue,
                data.descriptionValue.toUpperCase(),
                data.categoryValue,
                data.priceValue,
                data.docNumberValue,
                data.isFiscalDoc
            ]

            const result = await db.query(query, values)
            console.log(chalk.black.bgGreen.bold('✔ [Document Model] Documento inserido com sucesso:'), chalk.green(JSON.stringify(result.rows[0], null, 2)))
            return result.rows[0]

        } catch (err) {
            console.log(chalk.white.bgRed.bold('✖ [Document Model] Erro ao inserir documento:'), chalk.red(err.message))
            throw err
        }
    }

    async getAllDocs() {
        try {
            const query = `SELECT date, description, price_in_cents, doc_number, category
                            FROM documents`

            const result = db.query(query)
            return result.rows
        } catch (err) {
            console.log(chalk.white.bgRed.bold('✖ [Document Model] Erro ao buscar todos documentos:'), chalk.red(err.message))
            throw err

        }
    }
    async getLatestDocs() {
        try {
            console.log(chalk.black.bgYellow.bold('⏳ [Document Model] Iniciando consulta getLatestDocs...'))

            const query = `
        SELECT 
          d.id,
          d.date,
          d.description,
          d.price_in_cents,
          d.doc_number,
          d.is_fiscal_doc,
          c.nome AS category_name
        FROM documents d
        JOIN categorias c ON d.category = c.id
        ORDER BY d.id DESC
        LIMIT 10
      `

            const result = await db.query(query)
            console.log(chalk.black.bgGreen.bold('✔ [Document Model] Consulta getLatestDocs executada com sucesso. Quantidade de registros:'), chalk.blue(result.rows.length))
          

            return result.rows

        } catch (err) {
            console.log(chalk.white.bgRed.bold('✖ [Document Model] Erro ao buscar últimas notas:'), chalk.red(err.message))
            return { success: false, message: 'Erro ao buscar últimas notas' }
        }
    }
}

export default new DocumentModel()
