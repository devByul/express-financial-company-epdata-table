import { config } from "dotenv";
import { SignOptions } from "jsonwebtoken";
config({ path: ".env.public" });

interface serverOption {
  port: number;
  url: string;
  mode: string;
  modeDev: string;
  modePro: string;
  swagger: string;
}
interface fileuploadOption {
  csvDirname: string;
  nftDirname: string;
  nftMetaDirname: string;
  imgDirname: string;
  maxsize: string;
  description: string;
}
interface mysqlOption {
  name: string;
  host: string;
  user: string;
  port: number;
  password: string;
  database: string;
  connectionLimit: number;
}


interface Definition {
  server: serverOption;
  fileupload: fileuploadOption;
  mysql: mysqlOption;
}

export const Definition: Definition = {
  server: {
    port: Number(process.env.SERVER_PORT),
    url: process.env.SERVER_URL,
    mode: process.env.NODE_MODE!,
    modeDev: process.env.NODE_MODE_DEV!,
    modePro: process.env.NODE_MODE_PRO!,
    swagger: "on"
  },
  fileupload: {
    csvDirname: process.env.FILE_CSVDIR!,
    nftDirname: process.env.FILE_NFTDIR!,
    nftMetaDirname: process.env.FILE_METADIR!,
    imgDirname: process.env.FILE_IMGDIR!,
    maxsize: process.env.FILE_MAXSIZE!,
    description: process.env.FILE_MAXSIZE_DESC!
  },
  mysql: {
    name: process.env.MYSQL_NAME!,
    host: process.env.MYSQL_HOST!,
    user: process.env.MYSQL_USER!,
    port: Number(process.env.MYSQL_PORT),
    password: process.env.MYSQL_PASS!,
    database: process.env.MYSQL_DATABASE!,
    connectionLimit: Number(process.env.MYSQL_CONNECTIONLIMIT)
  },
};
