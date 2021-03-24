const express = require("express");
const { response } = require("./admin.route");
const router = express();

//import controllers
const orderController = require("../controllers/order.controller");
const adminController = require("../controllers/admin.controller");
const reprController = require("../controllers/repr.controller");

// import middlewares
const authMiddleware = require("../middlewares/auth.middleware");

//routers
router.post(
	"/order/add",
	authMiddleware.auth,
	authMiddleware.reprAuth,
	orderController.addOrders
);
router.get(
	"/order/status/:orderId",
	authMiddleware.auth,
	authMiddleware.reprAuth,
	orderController.checkOrderStatus
);
router.post(
	"/add/shop",
	authMiddleware.auth,
	authMiddleware.reprAuth,
	adminController.addShopToShopkeeper
);
router.post(
	"/dailyvisit",
	authMiddleware.auth,
	authMiddleware.reprAuth,
	reprController.dailyVisit
);

module.exports = router;
