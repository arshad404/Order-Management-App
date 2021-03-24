const UserDB = require("../models/User.model");
const RepresentativeDB = require("../models/identity/Representatives.model");
const DealerDB = require("../models/identity/Dealer.module");
const ShopkeeperDB = require("../models/identity/Shopkeeper.module");
const ShopDB = require("../models/identity/Shop.module");
const AdminDB = require("../models/identity/Admin.model");

module.exports.addUser = async (req, res) => {
	try {
		let { name, email, role, password, userId } = req.body;
		let user = new UserDB({
			name,
			email,
			role,
			password,
			userId
		});
		const userData = await UserDB.create(user);
		if (role == "REPRESENTATIVE") {
			await RepresentativeDB.create({
				info: userData._id,
				userId
			});
		}
		if (role == "SHOPKEEPER") {
			await ShopkeeperDB.create({
				info: userData._id,
				userId
			});
		}
		if (role == "DEALER") {
			await DealerDB.create({
				info: userData._id,
				userId
			});
		}
		if (role == "ADMIN") {
			await AdminDB.create({
				info: userData._id,
				userId
			});
		}
		return res.status(201).send("Data added successfully");
	} catch (err) {
		console.log(err.message);
		return res
			.status(400)
			.json({ message: err.message, route: "addUser" });
	}
};

module.exports.addShopToShopkeeper = async (req, res) => {
	try {
		let { shopId, name, products, category, ownerId } = req.body;
		let shop = new ShopDB({
			shopId,
			name,
			products,
			category,
			ownerId
		});
		await ShopDB.create(shop);
		res.status(200).send("Shop added successfully with owner");
	} catch (err) {
		return res
			.status(400)
			.json({ message: err.message, route: "addShop" });
	}
};

module.exports.checkOrderStatus = async (req, res) => {
	try {
		let { orderId } = req.params;
		let { OrderStatus } = await OrderDB.findOne({
			_id: orderId
		});
		let status = await OrderLog.find({ _id: OrderStatus[0] });
		res.status(200).send(status);
	} catch (error) {
		console.log(error);
		res.status(200).send("You can access only your order");
	}
};

module.exports.changeUserStatus = async (req, res) => {
	try {
		userId = req.params;
		await findOneAndUpdate(
			{ _id: userId },
			{ $set: { status: "SUSPENDED" } },
			(err, doc) => {
				if (err) {
					console.log(err);
					return res
						.send(400)
						.send(
							"unable to update the status of the user"
						);
				}
				return res
					.status(200)
					.send("Status changes to suspended");
			}
		);
	} catch (error) {
		res.status(400).send("Unable to update the status of the user");
	}
};
