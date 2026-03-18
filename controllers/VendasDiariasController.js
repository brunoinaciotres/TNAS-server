import VendasDiariasModel from "../model/VendasDiariasModel.js"


class VendasDiariasController {
    async insertNewVenda(req, res) {
        try {
            const dados = req.body
            console.log("DADOS DO CONTROLLER -> " , dados)
            let insertedVenda = await VendasDiariasModel.insertNewVendaDiaria(dados)
            return insertedVenda
        } catch (e) {
            console.log(e)
        }
        
    }
}

export default new VendasDiariasController 