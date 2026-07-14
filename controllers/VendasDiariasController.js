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

    async getVendasByDate(req, res){
        try {
            const {date} = req.body
            console.log("DATE CONTROLLER RECEIVED ->> ", date)
            let vendas = await VendasDiariasModel.getVendaDiariaByDate(date)
            
            return res.status(200).json({
                success: true,
                vendas
            })
            
        } catch(e) {
            console.log(e)
        }
    }
}

export default new VendasDiariasController 