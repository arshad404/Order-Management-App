const express = require("express");
const router = express();

//importing controller
const adminController = require("../controllers/admin.controller");
const productController = require("../controllers/product.controller");
const shopController = require("../controllers/shop.controller");
const orderController = require("../controllers/order.controller");

//middlewares
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
	"/add/user",
	authMiddleware.auth,
	authMiddleware.adminAuth,
	adminController.addUser
);
router.post(
	"/add/shop",
	authMiddleware.auth,
	authMiddleware.adminAuth,
	adminController.addShopToShopkeeper
);
router.post(
	"/add/product",
	authMiddleware.auth,
	authMiddleware.adminAuth,
	productController.addProduct
);
router.put(
	"/edit/product",
	authMiddleware.auth,
	authMiddleware.adminAuth,
	shopController.editProducts
);

router.put(
	"/user/status",
	authMiddleware.auth,
	authMiddleware.auth,
	adminController.changeUserStatus
);

router.post(
	"/order/update",
	authMiddleware.auth,
	authMiddleware.adminAuth,
	orderController.orderLogController
);

router.post(
	"/order/image/:productId",
	authMiddleware.auth,
	authMiddleware.adminAuth,
	productController.upload,
	productController.addPicOfProduct
);

router.get(
	"/order/status/:orderId",
	authMiddleware.auth,
	authMiddleware.adminAuth,
	orderController.checkOrderStatus
);

module.exports = router;
