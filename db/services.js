import { getConnection } from '@/db/conexion'
import oracledb from 'oracledb'
import { verifyPassword } from '@/utils/hasher';

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

export async function sp_list_films() {
    let connection
    try {
        const plsql = `
            DECLARE
                c SYS_REFCURSOR;
            BEGIN
                OPEN c FOR SELECT product_id, product_name, product_price, film_duration, film_author, portrait
                            FROM products
                            NATURAL JOIN short_films
                            WHERE product_type = 'FILM';
                DBMS_SQL.RETURN_RESULT(c);
            END;`;
        connection = await getConnection()
        const request = await connection.execute(plsql);
        let result = []
        request.implicitResults[0].map((filmInfo, index) => (
            result.push({
                film_id: filmInfo[0],
                film_name: filmInfo[1],
                film_price: filmInfo[2],
                film_duration: filmInfo[3],
                film_author: filmInfo[4],
                film_portrait: filmInfo[5]
            })
        ))
        return result
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

export async function film_details(film) {
    let connection
    try {
        const plsql = `
            DECLARE
                c SYS_REFCURSOR;
            BEGIN
                OPEN c FOR SELECT product_id, product_name, product_price, film_duration, synopsis, film_author, portrait
                            FROM products
                            NATURAL JOIN short_films
                            WHERE product_type = 'FILM' and product_id = :id;
                DBMS_SQL.RETURN_RESULT(c);
            END;`;
        connection = await getConnection()
        const request = await connection.execute(plsql, {id: film.id});
        let result = {}
        request.implicitResults[0].map((filmInfo, index) => (
            result = {
                film_id: filmInfo[0],
                film_name: filmInfo[1],
                film_price: filmInfo[2],
                film_duration: filmInfo[3],
                film_synopsis: filmInfo[4],
                film_author: filmInfo[5],
                film_portrait: filmInfo[6]
            }
        ))
        return result
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

export async function select_portraits() {
    let connection
    try {
        connection = await getConnection();
        const request = await connection.execute(`select portrait
                            FROM products
                            NATURAL JOIN short_films
                            WHERE product_type = 'FILM'`)
        const result = []
        request.rows.map((portraits, index) => (
            result.push(portraits)
        ))
        return request.rows
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

export async function sp_purchase(props) {
    let connection
    console.log('sp_purchase called with props:', await props)
    try {
        const data = await props;
        console.log('Purchase data:', data)
        connection = await getConnection()
        const result = await connection.execute(
            `BEGIN
                sp_purchase(:cId,:pId);
            END;`,
            {
                cId: data.userId,
                pId: data.film_id,
            }
        )
        return result
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

export async function sp_library(props) {
    let connection
    try {
        const data = await props
        const plsql = `
            DECLARE
                c SYS_REFCURSOR;
            BEGIN
                OPEN c FOR select product_id, product_name, portrait from short_films
                natural join purchases
                natural join products
                where client_id=:cId;
                DBMS_SQL.RETURN_RESULT(c);
            END;`;
        connection = await getConnection()
        const request = await connection.execute(
            plsql,
            { cId: data.userId },
            { implicitResults: true }
        )
        console.log('sp_library request:', await request.implicitResults)
        let result = []
        request.implicitResults[0].map((filmInfo, index) => (
            result.push({
                film_id: filmInfo[0],
                film_name: filmInfo[1],
                film_portrait: filmInfo[2]
            })
        ))
        console.log('Library result:', result)
        return result
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

export async function sp_film(props) {
    let connection
    try {
        const data = await props
        console.log('sp_film called with data:', data)
        console.log(typeof data.filmId, typeof data.userId)
        connection = await getConnection()
        const rawResult = await connection.execute(
            `BEGIN sp_film(:cId, :pId, :pName, :fAuth, :fUrl, :fSynopsis); END;`,
            {
                cId: data.userId,
                pId: data.filmId,
                pName: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 50 },
                fAuth: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 50 },
                fUrl: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 255 },
                fSynopsis: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 4000 }
            }
        )
        const result = {
            film_name: rawResult.outBinds.pName,
            film_author: rawResult.outBinds.fAuth,
            film_url: rawResult.outBinds.fUrl,
            film_synopsis: rawResult.outBinds.fSynopsis
        }
        console.log('sp_film result:', result)
        return result
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