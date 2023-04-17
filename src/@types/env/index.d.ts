export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT: string;
      SERVER_URL: string;
      FILE_CSVDIR: string;
      FILE_NFTDIR: string;
      FILE_IMGDIR: string;
      FILE_METADIR: string;
      FILE_MAXSIZE: string;
      FILE_MAXSIZE_DESC: string;
      MYSQL_NAME: string;
      MYSQL_HOST: string;
      MYSQL_PORT: string;
      MYSQL_USER: string;
      MYSQL_PASS: string;
      MYSQL_DATABASE: string;
      MYSQL_CONNECTIONLIMIT: string;
      REDIS_USERNAME: string;
      REDIS_PASSWORD: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
      API_URL: string;
      API_KEY: string;
      WSS_URL: string;
      PRIVATE_KEY: string;
      MNEMONIC_KEY: string;
      PINATA_API_KEY: string;
      PINATA_API_SECRET: string;
      PINATA_API_JWT: string;
      GMAIL_ID: string;
      GMAIL_PW: string;
      ALIGO_KEY: string;
      ALIGO_ID: string;
      ALIGO_SENDER: string;
      NCLOUD_KEY: string;
      NCLOUD_SECRET: string;
      NCLOUD_BUCKET: string;
      NCLOUD_ENDPOINT: string;
      NCLOUD_REGION: string;
    }
  }
}
