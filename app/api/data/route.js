import oracledb from 'oracledb'
import { getConnection } from '@/db/conexion'

export async function GET() {
    let connection
    try {
        connection = await getConnection();
        const result = await connection.execute(
            `BEGIN sp_library(:cId, :cur); END;`,
            {
                cId: 15,
                cur: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
            }
        )
        const resultSet = result.outBinds.cur
        const rows = {items: await resultSet.getRows()} // Puedes pasar un número o dejarlo vacío para todas
        await resultSet.close()
        return new Response(JSON.stringify(rows), { status: 200 })
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 })
    } finally {
            if (connection){
            try {
                await connection.close()
            } catch (err) {
                console.error(err)
            }
        }
    }
}