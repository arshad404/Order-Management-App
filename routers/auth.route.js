const express = require("express");
const router = express();

const authController = require("../controllers/auth.controller");

router.post("/login/admin", authController.adminLogin);
router.post("/login/dealer", authController.dealerLogin);
router.post("/login/repr", authController.reprLogin);
router.post("/login/shopkeeper", authController.shopkeeperLogin);

module.exports = router;
