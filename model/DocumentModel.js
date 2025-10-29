import * as db from './index.js'



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
            return result.rows[0]

        } catch (err) {
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
            throw err

        }
    }
    async getLatestDocs() {
        try {

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
          

            return result.rows

        } catch (err) {
            return { success: false, message: 'Erro ao buscar últimas notas' }
        }
    }

    async getDocsByCategorieId(id){
        
        try {
            console.log("id:: " + id)
            const query = 'SELECT id, date, description, price_in_cents, doc_number, is_fiscal_doc FROM documents WHERE category=$1'
            const values = [
                id
            ]

            const result = await db.query(query, values)
            return result.rows

        } catch(e){
             return { success: false, message: 'Erro ao buscar documentos por Id de Categoria', error: e }
        }
    }
}

export default new DocumentModel()
