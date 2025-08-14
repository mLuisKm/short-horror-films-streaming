import { getConnection } from '@/db/conexion';

export async function GET() {
    let connection
    try {
        connection = await getConnection();
        const result = await connection.execute("select * from CLIENTS");
        console.log("Successfully connected to Oracle Databas");
        console.log("Query rows", result.rows);
        return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
    } finally {
            if (connection){
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}