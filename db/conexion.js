import oracledb from 'oracledb'
import { initWalletFromEnv } from "./initWalletFromEnv.js";

export async function getConnection() {
    initWalletFromEnv();
    return await oracledb.getConnection({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectString: process.env.DB_CONNECT_STRING
    })
}