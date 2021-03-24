const app = require("./index");
const httpLogger = require("./middlewares/httpLogger");
const logger = require("./config/logger");

require("dotenv").config();

app.use(httpLogger);

app.listen(process.env.PORT, () => {
	logger.info(`SERVER STARTED on port ${process.env.PORT}`);
});
