import VendasDiariasModel from "../model/VendasDiariasModel.js"


class VendasDiariasController {
    async insertNewVenda(req, res) {
        try {
            const dados = req.body
            console.log("DADOS DO CONTROLLER -> ", dados)
            let insertedVenda = await VendasDiariasModel.insertNewVendaDiaria(dados)
            return insertedVenda
        } catch (e) {
            console.log(e)
        }

    }

    async getVendasByDate(req, res) {
        try {
            const { date } = req.body;

            const vendas = await VendasDiariasModel.getVendaDiariaByDate(date);

            const resposta = {
                vendaDinheiro: 0,
                maquinas: {}
            };

            vendas.forEach(venda => {

                // Dinheiro
                if (venda.forma_pagamento === "dinheiro") {
                    resposta.vendaDinheiro += venda.valor_cents / 100;
                    return;
                }

                // Máquinas
                if (!resposta.maquinas[venda.nome_maquina]) {
                    resposta.maquinas[venda.nome_maquina] = {
                        id: venda.id,
                        nome: venda.nome_maquina,
                        arrecadacaoDoDia: {
                            credito: "",
                            debito: "",
                            pix: "",
                            voucher: ""
                        }
                    };
                }

                resposta.maquinas[venda.nome_maquina].arrecadacaoDoDia[
                    venda.forma_pagamento
                ] = venda.valor_cents / 100;

            });

            return res.status(200).json({
                success: true,
                vendaDinheiro: resposta.vendaDinheiro,
                maquinas: Object.values(resposta.maquinas)
            });

        } catch (e) {
            console.error(e);

            return res.status(500).json({
                success: false,
                message: "Erro ao buscar vendas."
            });
        }
    }
}

export default new VendasDiariasController 