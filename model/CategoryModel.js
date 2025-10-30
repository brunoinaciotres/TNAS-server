import * as db from './index.js'

class CategoryModel {
    async getAll() {
        try {

            const query = `
        SELECT id, nome FROM categorias
      `

            const results = await db.query(query)


            return results.rows
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async getAllWithTotals() {
        try {
            const query = `
                SELECT c.id, c.nome, SUM(d.price_in_cents) as total_gasto
                FROM categorias c
                LEFT JOIN documents d ON d.category = c.id
                GROUP BY c.id, c.nome;
            `;
            const results = await db.query(query);
            return results.rows.map(row => ({
                ...row,
                total_gasto: Number(row.total_gasto),
                total_gasto_in_reais: Number(row.total_gasto) / 100 // já converte de centavos para reais
            }));
        } catch (err) {
            console.error(err);
            throw err;
        }
    }


}


export default new CategoryModel()