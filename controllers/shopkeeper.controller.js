const OrderDB = require("../models/order/Order.model");
const OrderLog = require("../models/order/OrderLog.model");
const UserDB = require("../models/User.model");

module.exports.confirmOrder = async (req, res) => {
	// let { orderId } = req.body;
	let { orderId } = req.params;
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
