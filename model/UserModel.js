import * as db from './index.js'

class UserModel{

    async getAllNames(){
        try {
            const query = "SELECT id, first_name, last_name from users"
            const res = await db.query(query)
            return res.rows
        }
        catch(e){
            console.log(e)
            throw new Error("Erro: " + e)
        }
    }
}

export default new UserModel()