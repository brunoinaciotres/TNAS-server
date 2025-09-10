import * as db from './index.js'

class UserModel{

    async getAllNames(){
        try {
            const query = "SELECT id, name from users"
            const res = await db.query(query)
            return results.rows
        }
        catch(e){
            console.log(e)
        }
    }
}