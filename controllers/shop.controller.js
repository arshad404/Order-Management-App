const ShopDB = require("../models/identity/Shop.module");
const OrderDB = require("../models/order/Order.model");
const fs = require("fs");

module.exports.editProducts = async (req, res) => {
	let { shopId, products } = req.body;
	await ShopDB.findOneAndUpdate(
		{ _id: shopId },
		{ $set: { products: products } },
		{ new: true },
		(err, doc) => {
			if (err) {
				console.log(err);
				return res
					.send(400)
					.send("unable to update the products");
			}
			return res
				.status(200)
				.send("Your products added successfully");
		}
	);
};
