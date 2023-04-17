import { Definition } from "../../config/definition";
import { logger } from "../../config/logger";
import mysql from "mysql2/promise";

const pool: any = {};

(async () => {
  try {
    const { name, host, port, user, password, database, connectionLimit } = Definition.mysql;

    pool[name] = mysql.createPool({
      host: host,
      port: port,
      user: user,
      password: password,
      database: database,
      connectionLimit: connectionLimit
    });

    const conn = await pool[name].getConnection();
    const rows = await conn.query("SELECT VERSION() As version");
    logger.info(`MySQL Connection : Version = ${rows[0][0].version}`);
    conn.release();
  } catch (error: any) {
    logger.error(`MySQL Connection Error : [${error.code}] ${error.message}`);
    process.exit(1);
  }
})();

export default pool;
