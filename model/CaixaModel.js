import * as db from './index.js'

class CaixaModeL {

    async getActualMonthCaixa() {
        try {

            const query = `
                        SELECT
                            DATE(data) AS data,
                            SUM(valor_cents) AS total_cents
                        FROM vendas_diarias
                            WHERE data >= DATE_TRUNC('month', CURRENT_DATE)
                            AND data < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
                        GROUP BY DATE(data)
                        ORDER BY DATE(data) DESC;
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