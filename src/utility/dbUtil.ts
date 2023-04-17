import pool from "../config/db/mysql";
import crypto from "crypto";
import { logger } from "../config/logger";
import ApiError from "./apiError";

export default class DB {
  static key() {
    return Date.now().toString(16) + crypto.randomBytes(4).toString("hex");
  }

  static async execute(db: any, sql: string, values?: any) {
    const conn = await pool[db].getConnection();
    logger.verbose(conn.format(sql, values));
    try {
      const row = await conn.query(sql, values);
      return row[0];
    } catch (error: any) {
      throw ApiError.regist(error);
    } finally {
      conn.release();
    }
  }

  static async agentExecute(db: any, sql: string, values?: any) {
    const conn = await pool[db].getConnection();
    logger.verbose(conn.format(sql, values));
    try {
      const row = await conn.query(sql, values);
      return row[0];
    } catch (error: any) {
      throw ApiError.regist(error);
    } finally {
      conn.release();
    }
  }

  static async getConnection(db: any) {
    return await pool[db].getConnection();
  }

  static async query(conn: any, sql: string, values?: any) {
    logger.verbose(conn.format(sql, values));
    const row = await conn.query(sql, values);
    return row[0];
  }

  static async release(conn: any) {
    await conn.release();
  }
}
