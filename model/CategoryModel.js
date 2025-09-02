import * as db from './index.js'
import chalk from 'chalk'
class CategoryModel {
    async getAll() {
        try {
            console.log(chalk.white.bgBlue.bold('🔵 [Category Model] Iniciando consulta: getAll categorias'))

            const query = `
        SELECT id, nome FROM categorias
      `

            const results = await db.query(query)

            console.log(chalk.white.bgGreen.bold('✅ [Category Model] Consulta concluída com sucesso. Resultados:'))
            console.log(chalk.green(JSON.stringify(results.rows, null, 2)))

            return results.rows
        } catch (err) {
            console.error(
                chalk.white.bgRed.bold('❌ [Category Model] Erro ao consultar categorias:'),
                chalk.red(err.message)
            )
            throw err
        }
    }
}


export default new CategoryModel()