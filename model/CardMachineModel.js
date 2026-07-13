import * as db from './index.js'

class CardMachineModel {

    async insertNewMaquina(nome, taxa_debito, taxa_credito, taxa_pix, taxa_voucher) {
        try {
            const query = "INSERT INTO maquinas_cartao (nome, taxa_credito, taxa_debito, taxa_pix, taxa_voucher) VALUES ($1, $2, $3, $4, $5) RETURNING *"
            const values = [nome, taxa_credito, taxa_debito, taxa_pix, taxa_voucher]

            const res = await db.query(query, values)

            return res.rows[0]
        }
        catch (e) {
            console.log(e)
            throw new Error("Erro: " + e.message)
        }
    }

    async getAllMachines() {
        try {

            const query = `
            SELECT 
                id,
                nome,
                taxa_debito,
                taxa_credito,
                taxa_pix,
                taxa_voucher
            FROM maquinas_cartao
            ORDER BY nome
        `

            const res = await db.query(query)

            return res.rows

        }
        catch (e) {
            console.log(e)
            throw new Error("Erro: " + e.message)
        }
    }

    async deleteMachine(id) {
        try {
            const query = `DELETE FROM maquinas_cartao WHERE id=$1`
            const values = [id]
            const res = await db.query(query, values)
            return res
        } catch (e) {
            console.log(e)
            throw new Error("Erro: " + e.message)
        }
    }

    async updateMachine(id, nome, taxa_debito, taxa_credito, taxa_pix, taxa_voucher) {
        try {

            const query = `
            UPDATE maquinas_cartao
            SET nome = $1,
                taxa_debito = $2,
                taxa_credito = $3,
                taxa_pix = $4,
                taxa_voucher = $5
            WHERE id = $6
            RETURNING *
        `

            const values = [nome, taxa_debito, taxa_credito, taxa_pix, taxa_voucher, id]

            const res = await db.query(query, values)

            return res.rows[0]

        }
        catch (e) {
            console.log(e)
            throw new Error("Erro: " + e.message)
        }
    }

}

export default new CardMachineModel()