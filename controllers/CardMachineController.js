import CardMachineModel from "../model/CardMachineModel.js"

class CardMachineController {

    async insertNewCardMachine(req, res) {

        try {

            const { nome, taxa } = req.body

            if (!nome || taxa === undefined) {
                return res.status(400).json({
                    success: false,
                    message: "Todos os campos obrigatórios devem ser preenchidos."
                })
            }

            const insertedMachine = await CardMachineModel.insertNewMaquina(
                nome,
                taxa
            )

            return res.status(200).json({
                success: true,
                insertedMachine
            })

        }
        catch (e) {
            console.log(e)
            return res.status(500).json({
                success: false,
                message: e.message
            })
        }

    }
    async getAllMachines(_, res) {

        try {

            const machines = await CardMachineModel.getAllMachines()

            return res.status(200).json({
                success: true,
                machines
            })

        }
        catch (e) {
            console.log(e)

            return res.status(500).json({
                success: false,
                message: e.message
            })
        }

    }
}

export default new CardMachineController()