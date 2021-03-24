const express = require("express");
const router = express();

//controllers
const shopkeeperController = require("../controllers/shopkeeper.controller");
const orderController = require("../controllers/order.controller");
const productController = require("../controllers/product.controller");

//middlewares
const authMiddleware = require("../middlewares/auth.middleware");

//routers
router.post(
	"/order/add",
	authMiddleware.auth,
	authMiddleware.shopKeeperAuth,
	orderController.addOrders
);
router.get(
	"/order/status/:orderId",
	authMiddleware.auth,
	authMiddleware.shopKeeperAuth,
	orderController.checkOrderStatus
);
router.put(
	"/order/confirm/:orderId",
	authMiddleware.auth,
	authMiddleware.shopKeeperAuth,
	shopkeeperController.confirmOrder
);

router.post(
	"/order/image/:productId",
	authMiddleware.auth,
	authMiddleware.shopKeeperAuth,
	productController.upload,
	productController.addPicOfProduct
);

module.exports = router;
