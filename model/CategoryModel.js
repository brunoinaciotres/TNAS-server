import * as db from './index.js'

class CategoryModel {
    async create(categoryName, is_expense){
        try {
            const query = `INSERT INTO
                            categorias (nome, is_expense)
                            VALUES($1, $2)
                            `

            const values = [categoryName.toUpperCase(), is_expense]
            const result = await db.query(query,values)
            return result.rows[0]
        }catch (e){
            console.log(e)
            throw e
        }
    }

    async delete(categoryId){
        try {
            const query = `DELETE FROM
                            categorias 
                            WHERE id = $1
                            `

            const values = [categoryId]
            const result = await db.query(query,values)
            return result.rows[0]
        }catch (e){
            console.log(e)
            throw e
        }
    }

    async getAll() {
        try {

            const query = `
        SELECT id, nome FROM categorias ORDER BY id DESC
      `

            const results = await db.query(query)


            return results.rows
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async getAllWithTotalsCurrentMonth() {
        try {
            const query = `
            SELECT 
                c.id, 
                c.nome, 
                COALESCE(SUM(d.price_in_cents), 0) AS total_gasto
            FROM categorias c
            LEFT JOIN documents d 
                ON d.category = c.id
                AND EXTRACT(MONTH FROM d.date) = EXTRACT(MONTH FROM CURRENT_DATE)
                AND EXTRACT(YEAR FROM d.date) = EXTRACT(YEAR FROM CURRENT_DATE)
            GROUP BY c.id, c.nome
            ORDER BY c.id DESC
        `;
            const results = await db.query(query);
            return results.rows.map(row => ({
                ...row,
                total_gasto: Number(row.total_gasto),
                total_gasto_in_reais: Number(row.total_gasto) / 100
            }));
        } catch (err) {
            console.error(err);
            throw err;
        }
    }



}


export default new CategoryModel()