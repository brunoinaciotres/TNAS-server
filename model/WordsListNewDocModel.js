import * as db from './index.js'

class WordsListNewDocModel {

    async getAllWords() {
        try {
            const query = `SELECT 
            w.id,
                w.word,
                w.category_id,
                c.nome AS category_name
            FROM words_list_new_doc w
            JOIN categorias c 
            ON w.category_id = c.id`
            const res = await db.query(query)
            return res.rows
        }
        catch (e) {
            console.log(e)
            throw new Error("Erro: " + e)
        }
    }

    async insertNewWord(word, categoryId) {
        try {
            const query = "INSERT INTO words_list_new_doc (word,category_id) values ($1,$2)"
            const values = [word, categoryId]
            const res = await db.query(query, values)
            return res
        }
        catch (e) {
            console.log(e)
            throw new Error("Erro: " + e.message)
        }
    }

    async updateWord(id, word, categoryId) {
        try {
            const query = "UPDATE words_list_new_doc SET word=$1, category_id = $2 WHERE id=$3 RETURNING *"
            const values = [word, categoryId, id]
            const res = await db.query(query, values)
            return res.rows[0]
        }
        catch (e) {
            console.log(e)
            throw new Error("Erro: " + e.message)
        }
    }
}

export default new WordsListNewDocModel()