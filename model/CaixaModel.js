import * as db from './index.js'

class CaixaModeL {

    async getActualMonthCaixa() {
        try {

            const query = `
                        SELECT
                            data,
                            SUM(valor_cents) AS total_cents
                        FROM (
                                 SELECT
                                    DATE(data) AS data,
                                    valor_cents
                                FROM vendas_caixa_dinheiro
                                WHERE data >= DATE_TRUNC('month', CURRENT_DATE)
                                AND data < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'

                            UNION ALL

                        SELECT
                            DATE(data) AS data,
                            valor_cents
                        FROM vendas_caixa_cartao
                        WHERE data >= DATE_TRUNC('month', CURRENT_DATE)
                          AND data < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
                        ) vendas
                        GROUP BY data
                        ORDER BY data DESC;
                    `

            const res = await db.query(query)

            return res.rows

        } catch (e) {
            console.log(e)
            throw new Error("Erro: " + e)
        }
    }


    async insertNewVendaCaixaDinheiro(caixa) {
        try {
            const caixaData = caixa.data
            const caixaMetodo = caixa.metodo
            const caixaValorCents = caixa.valor * 100
            const query = `
                INSERT INTO vendas_caixa_dinheiro (
                    data,
                    metodo,
                    valor_cents
                 )
                VALUES (
                    $1,
                    $2,
                    $3
                )
                RETURNING *;
            `
            const values = [caixaData, caixaMetodo, caixaValorCents]

            const res = await db.query(query, values)
            return res.rows[0]
        } catch (e) {
            console.log(e)
            throw new Error("Erro: " + e)
        }
    }

    async insertNewVendaCaixaCartao(caixa) {
        try {

            const {
                idMaquina,
                data,
                metodo,
                taxa,
                nomeMaquina,
                valorCents
            } = caixa;

            const query = `
            INSERT INTO vendas_caixa_maquinas (
                id_maquina,
                data,
                metodo,
                taxa,
                nome_maquina,
                valor_cents
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6
            )
            RETURNING *;
        `;

            const values = [
                idMaquina,
                data,
                metodo,
                taxa,
                nomeMaquina,
                valorCents
            ];

            const res = await db.query(query, values);

            return res.rows[0];

        } catch (e) {
            console.log(e);
            throw new Error("Erro: " + e);
        }
    }

    async insertNewCaixa(caixa) {
        try {

            const {
                data,
                pagamentos,
                vendaDinheiro,
                maquinasCartao
            } = caixa;

            // Venda em dinheiro
            if (vendaDinheiro > 0) {

                await db.query(
                    `
                INSERT INTO vendas_caixa_dinheiro
                    (data, metodo, valor_cents)
                VALUES
                    ($1,$2,$3)
                `,
                    [
                        data,
                        "vendaDinheiro",
                        Math.round(vendaDinheiro * 100)
                    ]
                );

            }

            // Pagamentos
            if (pagamentos > 0) {

                await db.query(
                    `
                INSERT INTO vendas_caixa_dinheiro
                    (data, metodo, valor_cents)
                VALUES
                    ($1,$2,$3)
                `,
                    [
                        data,
                        "pagamentos",
                        Math.round(pagamentos * 100)
                    ]
                );

            }

            // Máquinas
            for (const maquina of maquinasCartao) {

                const arrecadacao = maquina.arrecadacaoDoDia;

                const formas = [
                    {
                        metodo: "credito",
                        valor: arrecadacao.credito,
                        taxa: maquina.taxa_credito
                    },
                    {
                        metodo: "debito",
                        valor: arrecadacao.debito,
                        taxa: maquina.taxa_debito
                    },
                    {
                        metodo: "pix",
                        valor: arrecadacao.pix,
                        taxa: maquina.taxa_pix
                    },
                    {
                        metodo: "voucher",
                        valor: arrecadacao.voucher,
                        taxa: maquina.taxa_voucher
                    }
                ];

                for (const forma of formas) {

                    if (!forma.valor || Number(forma.valor) <= 0) continue;

                    await db.query(
                        `
                    INSERT INTO vendas_caixa_cartao
                    (
                        id_maquina,
                        data,
                        metodo,
                        taxa,
                        nome_maquina,
                        valor_cents
                    )
                    VALUES
                    (
                        $1,$2,$3,$4,$5,$6
                    )
                    `,
                        [
                            maquina.id,
                            data,
                            forma.metodo,
                            forma.taxa,
                            maquina.nome,
                            Math.round(Number(forma.valor) * 100)
                        ]
                    );

                }

            }

            return true;

        } catch (e) {
            console.log("ERRO MODEL: ", e);
            throw new Error(e.message);
        }
    }

    async getCaixaByDate(date) {
        try {

            const dinheiroQuery = `
            SELECT
                metodo,
                valor_cents
            FROM vendas_caixa_dinheiro
            WHERE DATE(data) = $1
        `;

            const cartaoQuery = `
            SELECT
                id_maquina,
                nome_maquina,
                metodo,
                taxa,
                valor_cents
            FROM vendas_caixa_cartao
            WHERE DATE(data) = $1
            ORDER BY nome_maquina;
        `;

            const dinheiro = await db.query(dinheiroQuery, [date]);
            const cartao = await db.query(cartaoQuery, [date]);

            return {
                dinheiro: dinheiro.rows,
                cartao: cartao.rows
            };

        } catch (e) {
            console.log(e);
            throw new Error("Erro: " + e);
        }
    }
}

export default new CaixaModeL()