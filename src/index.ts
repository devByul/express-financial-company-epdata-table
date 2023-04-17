import app from "./config/express";

import "./config/db/mysql";
import { logger } from "./config/logger";
import { Definition } from "./config/definition";

const port = Definition.server.port || 4500;
const mode = Definition.server.mode || process.env.NODE_MODE;

app.listen(port, async () => {
  logger.info(`Server listening on port : ${port}`);
  logger.info(`Server MODE : ${mode}`);
});
