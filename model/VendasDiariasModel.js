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

        Object.entries(maquina.arrecadacaoDoDia).forEach(([forma_pagamento, valor]) => {

          const valorNumero = Number(valor)
          if (!valorNumero) return

          let taxa 
          if (forma_pagamento === "credito") taxa = maquina.taxa_credito
          if (forma_pagamento === "debito") taxa = maquina.taxa_debito
          if (forma_pagamento === "pix") taxa = maquina.taxa_pix
          if (forma_pagamento === "voucher") taxa = maquina.taxa_voucher

          vendasDiaria.push({
            data,
            forma_pagamento,
            taxa,
            valor_cents: Math.round(valorNumero * 100),
            nome_maquina: maquina.nome
          })

        })

      })

      const query = `
        INSERT INTO vendas_diarias (data, forma_pagamento, valor_cents, taxa, nome_maquina)
        VALUES ($1,$2,$3,$4,$5)
      `

      for (const venda of vendasDiaria) {

        const values = [
          venda.data,
          venda.forma_pagamento,
          venda.valor_cents,
          venda.taxa,
          venda.nome_maquina
        ]

        await db.query(query, values)
      }

      return { success: true }

    } catch (e) {
      console.log(e)
      throw new Error("Erro: " + e)
    }
  }

  async getVendaDiariaByDate(date){
    try {
      const query = `SELECT *
                    FROM vendas_diarias
                    WHERE DATE(data) = $1
                    `
      const values = [
          date
        ]

      const res = await db.query(query, values)
      return res.rows

    } catch (e){
      console.log(e)
      throw new Error("Erro: " + e)
    }
  }
}

export default new VendasDiarias()