import CaixaModel from "../model/CaixaModel.js"

class CaixaController {
  async getActualMonthVendas(req, res) {
    try {

      const vendas = await CaixaModel.getActualMonthCaixa()

      return res.status(200).json(vendas)

    } catch (e) {
      console.log(e)

      return res.status(500).json({
        error: "Erro ao buscar vendas do mês"
      })
    }
  }
}

export default new CaixaController()
