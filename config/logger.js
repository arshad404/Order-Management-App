const { createLogger, transports, format } = require("winston");
require("winston-mongodb");

const logger = createLogger({
	transports: [
		new transports.File({
			filename: "info.log",
			level: "info",
			format: format.combine(
				format.timestamp({
					format: "YYYY-MM-DD HH:mm:ss:ms"
				}),
				format.json(),
				format.printf(
					info =>
						`${info.timestamp} ${info.level}: ${info.message}`
				)
			)
		}),
		new transports.MongoDB({
			level: "info",
			db: "mongodb://localhost:27017/OrderManagementApp",
			options: { useUnifiedTopology: true },
			collection: "logData",
			format: format.combine(
				format.timestamp(),
				format.json()
			)
		}),
		new transports.Console()
	]
});

module.exports = logger;
