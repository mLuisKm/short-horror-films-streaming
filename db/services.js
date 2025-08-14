import { getConnection } from '@/db/conexion';

export async function sp_register_client(props) {
    let connection;
    try {
        const data = await props;
        connection = await getConnection();
        const result = await connection.execute(
            `BEGIN
                sp_register_client(:fName,:lName,:nName,:email_address,:dOfBirth,:gen,:pWord,:cRole,:uParent);
            END;`,
            {
                fName: data.firstName,
                lName: data.lastName,
                nName: data.nickname,
                email_address: data.email,
                dOfBirth: new Date(data.dob),
                gen: data.gender,
                pWord: data.password,
                cRole: 'ADMIN',
                uParent: null
            },
            { autoCommit: true }
        );
        return result;
    } catch (err) {
        console.error('Error executing stored procedure:', err);
        throw err;
    }
    finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error closing connection:', err);
            }
        }
    }
}
