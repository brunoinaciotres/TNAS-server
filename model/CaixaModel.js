import * as db from './index.js'

class CaixaModeL {

    async getActualMonthCaixa() {
        try {

            const query = `
        SELECT *
        FROM vendas_diarias
        WHERE data >= DATE_TRUNC('month', CURRENT_DATE)
        AND data < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
        ORDER BY data DESC
      `

            const res = await db.query(query)

            return res.rows

        } catch (e) {
            console.log(e)
            throw new Error("Erro: " + e)
        }
    }

}

export default new CaixaModeL()