const DealerDB = require("../models/identity/Dealer.module");
const OrderDB = require("../models/order/Order.model");
const ProductDB = require("../models/order/Product.model");
const UserDB = require("../models/User.model");
const RepresentativeDB = require("../models/identity/Representatives.model");
const ShopkeeperDB = require("../models/identity/Shopkeeper.module");
const AdminDB = require("../models/identity/Admin.model");
const OrderLog = require("../models/order/OrderLog.model");

module.exports.addOrders = async (req, res) => {
	try {
		let { batches, orderBy, orderTo } = req.body;

		let orderPromise = [];
		for (let index = 0; index < batches.length; index++) {
			let productId = batches[index].productDetails;
			orderPromise.push(
				ProductDB.find({
					_id: productId
				})
			);
		}

		let resolvePromise = await Promise.all(orderPromise);

		let price = 0;
		for (let index = 0; index < resolvePromise.length; index++) {
			let productPrice = resolvePromise[index][0].price;
			price = productPrice * batches[index].quantity;
			batches[index]["price"] = price;
		}

		let totalPrice = 0;
		for (let index = 0; index < batches.length; index++) {
			totalPrice += batches[index].price;
		}

		let orderByDetails = await UserDB.findOne({ _id: orderBy });
		let orderToDetails = await UserDB.findOne({ _id: orderTo });

		let orderConfirm;
		if (orderByDetails.role == "REPRESENTATIVE") {
			orderConfirm = false;
		} else {
			orderConfirm = true;
		}

		let order = new OrderDB({
			batches,
			totalPrice,
			orderBy,
			orderTo,
			orderConfirm
		});
		order["history"] = order._id;
		let createdOrder = await OrderDB.create(order);

		const UpdateDatabase = async function (databaseName, userId) {
			const { orders } =
				(await databaseName.findOne({
					userId
				})) || [];

			orders.push(createdOrder._id);
			await databaseName.updateOne(
				{ userId },
				{ orders },
				function (error, success) {
					if (error) {
						console.log(error);
					} else {
						console.log(success);
					}
				}
			);
		};

		let orderByRole = orderByDetails.role;
		let userIdBy = orderByDetails.userId;
		let orderToRole = orderToDetails.role;
		let userIdTo = orderToDetails.userId;

		if (orderByRole == "REPRESENTATIVE") {
			let { orderShop } = req.body;
			let { orders } = await ShopkeeperDB.findOne({
				_id: orderShop
			});
			orders.push(createdOrder._id);
			await ShopkeeperDB.updateOne(
				{ _id: orderShop },
				{ orders },
				function (error, success) {
					if (error) {
						console.log(error);
					} else {
						console.log(success);
					}
				}
			);
			UpdateDatabase(RepresentativeDB, userIdBy);
		}
		if (orderByRole == "DEALER") {
			UpdateDatabase(DealerDB, userIdBy);
		}

		if (orderByRole == "ADMIN") {
			UpdateDatabase(AdminDB, userIdBy);
		}

		if (orderToRole == "SHOPKEEPER") {
			UpdateDatabase(ShopkeeperDB, userIdTo);
		}

		if (orderToRole == "DEALER") {
			UpdateDatabase(DealerDB, userIdTo);
		}

		res.status(200).send("Order added successfully");
	} catch (error) {
		console.log(error);
	}
};

module.exports.orderLogController = async (req, res) => {
	let { status, description, updatedAt, orderId } = req.body;
	let log = new OrderLog({
		status,
		description,
		updatedAt
	});
	let logCreated = await OrderLog.create(log);
	let { OrderStatus } = await OrderDB.findOne({ _id: orderId });
	OrderStatus.push(logCreated._id);
	await OrderDB.updateOne(
		{ _id: orderId },
		{ OrderStatus },
		function (error, success) {
			if (error) {
				console.log(error);
			} else {
				console.log(success);
			}
		}
	);
	res.status(200).send("Order logged successfully");
};

module.exports.confirmOrder = async (req, res) => {
	let { orderId } = req.body;
	await OrderDB.findOneAndUpdate(
		{ _id: orderId },
		{ $set: { orderConfirm: true } },
		{ new: true },
		(err, doc) => {
			if (err) {
				console.log(err);
				return res
					.send(400)
					.send("unable to update the products");
			}
			return res.status(200).send("Your confirm the order");
		}
	);
};

module.exports.checkOrderStatus = async (req, res) => {
	let { orderId } = req.params;
	let { OrderStatus, orderBy, orderTo } = await OrderDB.findOne({
		_id: orderId
	});
	if (req.user._id == orderBy || req.user._id == orderTo) {
		let status = await OrderLog.find({ _id: OrderStatus[0] });
		res.status(200).send(status);
	} else {
		res.status(200).send("You can access only your order");
	}
};
