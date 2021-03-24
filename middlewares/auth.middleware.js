const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token) {
		return res.status(401).send("You need to login, auth.js");
	}
	const decodePayload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
	req.user = decodePayload;
	next();
};

const dealerAuth = (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token) {
		return res
			.status(401)
			.send("You need to login as dealer, auth.js");
	}
	const decodePayload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
	//   console.log(decodePayload);

	if (decodePayload.role == "DEALER" || decodePayload.role == "ADMIN") {
		req.user = decodePayload;
		next();
	} else {
		return res.status(400).send("No, you are not dealer");
	}
};

const reprAuth = (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token) {
		return res
			.status(401)
			.send("You need to login as Representative, auth.js");
	}
	const decodePayload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

	if (
		decodePayload.role == "REPRESENTATIVE" ||
		decodePayload.role == "ADMIN"
	) {
		req.user = decodePayload;
		next();
	} else {
		return res.status(400).send("No, you are not a teacher");
	}
};

const shopKeeperAuth = (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token) {
		return res
			.status(401)
			.send("You need to login as Shopkeeper, auth.js");
	}
	const decodePayload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

	if (
		decodePayload.role == "SHOPKEEPER" ||
		decodePayload.role == "ADMIN"
	) {
		req.user = decodePayload;
		next();
	} else {
		return res.status(400).send("No, you are not a Shopkeeper");
	}
};

const adminAuth = (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token) {
		return res
			.status(401)
			.send("You need to login as Admin, auth.js");
	}
	const decodePayload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

	if (decodePayload.role == "ADMIN") {
		req.user = decodePayload;
		next();
	} else {
		return res.status(400).send("No, you are not a Admin");
	}
};

module.exports = { auth, dealerAuth, shopKeeperAuth, reprAuth, adminAuth };
