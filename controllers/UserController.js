import UserModel from "../model/UserModel.js"

class UserController {
    async getAllNames(_, res) {

        try {
            const users = await UserModel.getAllNames()

            return res.status(200).json({
                success: true,
                users
            })
        }
        catch (e) {
            console.log(e)
             return res.status(500).json({
                success: false,
                e
            })
        }

    }
}

export default new UserController()