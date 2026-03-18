import * as db from './index.js'

class VendasDiarias {

  async insertNewVendaDiaria(dados) {
    try {

      const { data, maquinasCartao, pagamentos, vendaDinheiro } = dados

      const vendasDiaria = []

      // DINHEIRO
      vendasDiaria.push({
        data,
        forma_pagamento: "dinheiro",
        valor_cents: Math.round((Number(pagamentos) + Number(vendaDinheiro)) * 100),
        taxa: 0
      })

      // CARTÕES
      maquinasCartao.forEach(maquina => {

        const taxa = Number(maquina.taxa)

        Object.entries(maquina.arrecadacaoDoDia).forEach(([forma_pagamento, valor]) => {

          const valorNumero = Number(valor)

          if (!valorNumero) return

          vendasDiaria.push({
            data,
            forma_pagamento,
            taxa,
            valor_cents: Math.round(valorNumero * 100)
          })

        })

      })

      const query = `
        INSERT INTO vendas_diarias (data, forma_pagamento, valor_cents, taxa)
        VALUES ($1,$2,$3,$4)
      `

      for (const venda of vendasDiaria) {

        const values = [
          venda.data,
          venda.forma_pagamento,
          venda.valor_cents,
          venda.taxa
        ]

        await db.query(query, values)
      }

      return { success: true }

    } catch (e) {
      console.log(e)
      throw new Error("Erro: " + e)
    }
  }
}

export default new VendasDiarias()