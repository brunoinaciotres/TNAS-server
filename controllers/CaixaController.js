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

  async insertNewVendaCaixaDinheiro(req, res) {
    try {
      const { data, metodo, valor } = req.body
      const caixa = {
        data,
        metodo,
        valor
      }
      const newVendaDinheiro = await CaixaModel.insertNewVendaCaixaDinheiro(caixa)
      return res.status(201).json(newVendaDinheiro)

    } catch (e) {
      console.log(e)

      return res.status(500).json({
        error: "Erro ao buscar vendas do mês"
      })
    }

  }

  async insertNewVendaCaixaCartao(req, res) {
    try {

      const {
        idMaquina,
        data,
        metodo,
        taxa,
        nomeMaquina,
        valorCents
      } = req.body;

      const venda = await VendasDiariasModel.insertNewVendaCaixaCartao({
        idMaquina,
        data,
        metodo,
        taxa,
        nomeMaquina,
        valorCents
      });

      return res.status(201).json({
        success: true,
        venda
      });

    } catch (e) {
      console.error(e);

      return res.status(500).json({
        success: false,
        message: "Erro ao inserir venda da máquina.",
        error: e.message
      });
    }
  }

  async insertNewCaixa(req, res) {
    try {

      const caixa = req.body;

      const resultado = await CaixaModel.insertNewCaixa(caixa);

      return res.status(201).json({
        success: true,
        resultado
      });

    } catch (e) {
      console.log("erro CONTROLLER ", e);

      return res.status(500).json({
        success: false,
        message: e.message
      });
    }
  }

  async getCaixaByDate(req, res) {
    try {

      const { date } = req.body;

      const { dinheiro, cartao } = await CaixaModel.getCaixaByDate(date);

      const resposta = {
        pagamentos: 0,
        vendaDinheiro: 0,
        maquinas: {}
      };

      // Dinheiro
      dinheiro.forEach(item => {

        if (item.metodo === "pagamentos") {
          resposta.pagamentos = item.valor_cents / 100;
        }

        if (item.metodo === "vendaDinheiro") {
          resposta.vendaDinheiro = item.valor_cents / 100;
        }

      });

      // Cartões
      cartao.forEach(item => {

        if (!resposta.maquinas[item.nome_maquina]) {

          resposta.maquinas[item.nome_maquina] = {
            id: item.id_maquina,
            nome: item.nome_maquina,
            arrecadacaoDoDia: {
              credito: "",
              debito: "",
              pix: "",
              voucher: ""
            }
          };

        }

        resposta.maquinas[item.nome_maquina]
          .arrecadacaoDoDia[item.metodo] = item.valor_cents / 100;

      });

      return res.status(200).json({
        success: true,
        caixa: {
          pagamentos: resposta.pagamentos,
          vendaDinheiro: resposta.vendaDinheiro,
          maquinasCartao: Object.values(resposta.maquinas)
        }
      });

    } catch (e) {

      console.error(e);

      return res.status(500).json({
        success: false,
        message: "Erro ao buscar caixa."
      });

    }
  }
}

export default new CaixaController()
