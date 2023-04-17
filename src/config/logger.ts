import { addColors, format, createLogger, transports } from "winston";
import WinstonDaily from "winston-daily-rotate-file";
import { Definition } from "../config/definition";
import { StreamOptions } from "morgan";

const logDir = "logs";
const { combine, timestamp, printf, colorize } = format;

const level = () => {
  const NODE_MODE = Definition.server.mode;
  const isDevelopment = NODE_MODE === Definition.server.modeDev;

  return isDevelopment ? "debug" : "error";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white"
};
addColors(colors);

// Define log format
const proLogFormat = printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});
const devLogFormat = printf(info => {
  return `[dev] ${info.timestamp} ${info.level} : ${info.message}`;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */

const logger = createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    proLogFormat
  ),
  transports: [
    // info level log save
    new WinstonDaily({
      level: "info",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/info",
      filename: "%DATE%.log",
      maxFiles: 30, // 30 days
      zippedArchive: true
    }),
    // error level log save
    new WinstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/error",
      filename: "%DATE%.error.log",
      maxFiles: 30, // 30 days
      zippedArchive: true
    }),
    new transports.Console({
      level: level(),
      handleExceptions: true,
      format: combine(colorize({ all: true }), devLogFormat)
    })
  ]
});

const stream: StreamOptions = {
  write: (message: string) => {
    message = message.substring(0, message.length - 1);
    logger.info(`${message}`);
  }
};

export { stream, logger };
