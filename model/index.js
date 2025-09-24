import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config()

import { Pool } from "pg"

let pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  // ssl: {
  //   ca: fs.readFileSync("global-bundle.pem").toString(),
  //   rejectUnauthorized: true
  // }
})



export const query = async (text, params) => {
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start
  console.log('Executed Query', { text, duration, rows: res.rowCount })
  return res
}
