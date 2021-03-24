require("dotenv").config();
const bcrypt = require("bcryptjs");
const UserDB = require("../models/User.model");

const dealerLogin = async (req, res, next) => {
	try {
		let { email, password } = req.body;
		let dealer = await UserDB.findOne({ email });
		if (dealer) {
			let matchPass = await bcrypt.compare(
				password,
				dealer.password
			);
			if (matchPass) {
				let token = dealer.generateToken();
				return res
					.status(200)
					.header("x-auth-token", token)
					.json(`${token}`);
			} else {
				return res
					.status(400)
					.json({ message: "Wrong Credentials" });
			}
		} else {
			return res
				.status(400)
				.json({ message: "Wrong email/pass" });
		}
	} catch (err) {
		return res.status(400).send(err.message);
	}
};

const shopkeeperLogin = async (req, res, next) => {
	try {
		let { email, password } = req.body;
		let sk = await UserDB.findOne({ email });
		if (sk) {
			let matchPass = await bcrypt.compare(
				password,
				sk.password
			);
			if (matchPass) {
				let token = sk.generateToken();
				console.log(token);
				return res
					.status(200)
					.header("x-auth-token", token)
					.json(`${token}`);
			} else {
				return res
					.status(200)
					.json({ message: "Wrong Credentials" });
			}
		} else {
			return res
				.status(400)
				.json({ message: "Wrong email/pass" });
		}
	} catch (err) {
		return res.status(400).send(err.message);
	}
};

const reprLogin = async (req, res, next) => {
	try {
		let { email, password } = req.body;
		let repr = await UserDB.findOne({ email });
		if (repr) {
			let matchPass = await bcrypt.compare(
				password,
				repr.password
			);
			if (matchPass) {
				let token = repr.generateToken();
				return res
					.status(200)
					.header("x-auth-token", token)
					.json(`${token}`);
			} else {
				return res
					.status(200)
					.json({ message: "Wrong Credentials" });
			}
		} else {
			return res
				.status(400)
				.json({ message: "Wrong email/pass" });
		}
	} catch (err) {
		return res.status(400).send(err.message);
	}
};

const adminLogin = async (req, res, next) => {
	try {
		let { email, password } = req.body;
		let admin = await UserDB.findOne({ email });
		if (admin) {
			let matchPass = await bcrypt.compare(
				password,
				admin.password
			);
			if (matchPass) {
				let token = admin.generateToken();
				return res
					.status(200)
					.header("x-auth-token", token)
					.json(`${token}`);
			} else {
				return res
					.status(200)
					.json({ message: "Wrong Credentials" });
			}
		} else {
			return res
				.status(400)
				.json({ message: "Wrong email/pass" });
		}
	} catch (err) {
		return res.status(400).send(err.message);
	}
};

module.exports = {
	dealerLogin,
	shopkeeperLogin,
	reprLogin,
	adminLogin
};
