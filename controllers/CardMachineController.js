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

    async deleteMachine(req, res) {
        try {
            const { id } = req.body

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Todos os campos obrigatórios devem ser preenchidos."
                })
            }

            const deletedMachine = await CardMachineModel.deleteMachine(id)

            return res.status(200).json({
                success: true,
                deletedMachine
            })

        } catch (e) {
            console.log(e)

            return res.status(500).json({
                success: false,
                message: e.message
            })
        }
    }

    async updateMachine(req, res) {

        try {

            const { id, nome, taxa } = req.body

            if (!id || !nome || taxa === undefined) {
                return res.status(400).json({
                    success: false,
                    message: "Todos os campos obrigatórios devem ser preenchidos."
                })
            }

            const updatedMachine = await CardMachineModel.updateMachine(
                id,
                nome,
                taxa
            )

            return res.status(200).json({
                success: true,
                updatedMachine
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