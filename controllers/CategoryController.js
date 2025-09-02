import CategoryModel from "../model/CategoryModel.js"
import chalk from "chalk"

class CategoryController {
    async getAll(_, res) {
        try {
            console.log(chalk.white.bgBlue.bold('🔵 [Category Controller] Requisição GET /categories recebida'))

            const categories = await CategoryModel.getAll()

            console.log(chalk.white.bgGreen.bold('✅ [Category Controller] Requisição concluída com sucesso'))
            console.log(chalk.green(JSON.stringify({
                success: true,
                categories
            }, null, 2)))

            return res.status(200).json({
                success: true,
                categories
            })
        } catch (err) {
            console.error(
                chalk.white.bgRed.bold('❌ [Category Controller] Erro ao processar requisição:'),
                chalk.red(err.message)
            )
            return res.status(500).json({ message: 'Erro ao procurar categorias', error: err.message })
        }
    }
}

export default new CategoryController()