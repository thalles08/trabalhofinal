import mysql from 'mysql2/promise';

export default async function Conectar(){

    if (global.poolConexoes){
        return await global.poolConexoes.getConnection();
    }

    const pool = await mysql.createPool({
        host: '129.146.68.51',
        user: 'aluno11-p1engsoft',
        password: 'ALt00AYNqy204aHRg6bX',
        database: 'backend-aluno11-p1engsoft',
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
      });

    global.poolConexoes = pool
    return await pool.getConnection();
}