const express = require("express");
const app = express();
const database = require("./config/mongoConnect")();
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const logger = require("./config/logger");
const httpLogger = require("./middlewares/httpLogger");
const helmet = require("helmet");
require("dotenv").config();
const numCPU = require("os").cpus().length;

//routers
const adminRoute = require("./routers/admin.route");
const shopkeeperRoute = require("./routers/shopkeeper.route");
const dealerRoute = require("./routers/dealer.route");
const reprRoute = require("./routers/repr.route");
const authRoute = require("./routers/auth.route");

//middlewares
app.use(express.json());
app.use(helmet());
app.use(cors({ exposedHeaders: "x-auth-token" }));

//API limiter (limit 200 api hits in 15 minutes)
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 200
});
app.use("/api/v1", apiLimiter);

//APIs
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/dealer", dealerRoute);
app.use("/api/v1/shopkeeper", shopkeeperRoute);
app.use("/api/v1/repr", reprRoute);
app.use("/api/v1/auth", authRoute);

module.exports = app;
