import CategoryModel from '../model/CategoryModel.js'

class CategoryController {
    async create(req, res) {
        try {
            const { categoryName } = req.body
            if (!categoryName) return res.status(400).json({ success: false, msg: "Falta de parâmetro" })
            const newCategory = await CategoryModel.create(categoryName)
            console.log(req.body.categoryName)

            return res.status(201).json({
                success: true,
                newCategory
            })
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Erro ao criar categoria',
                error: err.message
            });
        }
    }

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
            const categories = await CategoryModel.getAllWithTotalsCurrentMonth();

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
