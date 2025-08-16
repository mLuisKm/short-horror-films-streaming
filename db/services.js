import { getConnection } from '@/db/conexion'
import oracledb from 'oracledb'
import { hashPassword, verifyPassword } from '@/utils/hasher'

export async function sp_register_client(props) {
    let connection
    try {
        const data = await props;
        connection = await getConnection()
        const result = await connection.execute(
            `BEGIN
                sp_register_client(:fName,:lName,:nName,:email_address,:dOfBirth,:gen,:pWord,:cRole,:uParent);
            END;`,
            {
                fName: data.firstName,
                lName: data.lastName,
                nName: data.nickname,
                email_address: data.email,
                dOfBirth: data.dob,
                gen: data.gender,
                pWord: data.password,
                cRole: 'ADMIN',
                uParent: null
            },
            { autoCommit: true }
        )
        return result
    } catch (err) {
        throw err
    }
    finally {
        if (connection) {
            try {
                await connection.close()
            } catch (err) {
                console.error('Error closing connection:', err)
            }
        }
    }
}

export async function sp_login_client(props) {
    let connection
    try {
        const data = await props
        connection = await getConnection()
        const rawResult = await connection.execute(
            `BEGIN
                sp_login_client(:email_or_nickname, :cId, :cRole, :cPassword);
            END;`,
            {
                email_or_nickname: data.emailOrNickname,
                cId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
                cRole: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 15 },
                cPassword: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 255 }
            }
        )
        if (rawResult.outBinds.cId && rawResult.outBinds.cRole && rawResult.outBinds.cPassword) {
            if(await verifyPassword(data.password, rawResult.outBinds.cPassword)) {
                const result = {
                    userId: rawResult.outBinds.cId,
                    role: rawResult.outBinds.cRole
                }
            console.log('Password verified successfully')
            return result
        } else {
            console.error('Password verification failed')
            return {
                error: 'Invalid credentials',
                reason: 'Incorrect password'
            }
        }
        }
    } catch (err) {
        throw err
    } finally {
        if (connection) {
            try {
                await connection.close()
            } catch (err) {
                console.error('Error closing connection:', err)
            }
        }
    }
}
