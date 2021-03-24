const express = require("express");
const { response } = require("./admin.route");
const router = express();

//import controllers
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middleware");

//routers
router.post(
	"/order/add",
	authMiddleware.auth,
	authMiddleware.dealerAuth,
	orderController.addOrders
);
router.post(
	"/order/edit",
	authMiddleware.auth,
	authMiddleware.dealerAuth,
	orderController.orderLogController
);
router.get(
	"/order/status/:orderId",
	authMiddleware.auth,
	authMiddleware.dealerAuth,
	orderController.checkOrderStatus
);

module.exports = router;
