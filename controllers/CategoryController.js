import CategoryModel from '../model/CategoryModel.js'

class CategoryController {
    async getAll(_, res) {
        try {
            const categories = await CategoryModel.getAll();

            return res.status(200).json({
                success: true,
                categories
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Erro ao procurar categorias',
                error: err.message
            });
        }
    }

    async getAllWithTotals(_, res) {
        try {
            const categories = await CategoryModel.getAllWithTotals();

            return res.status(200).json({
                success: true,
                categories
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Erro ao procurar categorias com totais',
                error: err.message
            });
        }
    }
}

export default new CategoryController();
