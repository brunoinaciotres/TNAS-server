import * as db from './index.js'

class CardMachineModel {

    async insertNewMaquina(nome, taxa) {
        try {
            const query = "INSERT INTO maquinas_cartao (nome, taxa) VALUES ($1, $2) RETURNING *"
            const values = [nome, taxa]

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
                taxa
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

    async updateMachine(id, nome, taxa) {
        try {

            const query = `
            UPDATE maquinas_cartao
            SET nome = $1,
                taxa = $2
            WHERE id = $3
            RETURNING *
        `

            const values = [nome, taxa, id]

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