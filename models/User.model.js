const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			required: true
		},
		userId: {
			type: String
		},
		role: {
			type: String,
			enum: [
				"ADMIN",
				"DEALER",
				"REPRESENTATIVE",
				"SHOPKEEPER"
			],
			default: "SHOPKEEPER",
			required: true
		},
		registeredOn: {
			type: Date,
			default: Date.now
		},
		password: {
			type: String,
			required: true
		},
		status: {
			type: String,
			enum: ["ACTIVE", "SUSPENDED", "BLOCKED"],
			default: "ACTIVE"
		}
	},
	{ timestamps: true }
);

UserSchema.pre("save", async function (next) {
	this.email = String(this.email).toLowerCase();
	if (!this.isModified("password")) return next();
	let salt = await bcrypt.genSalt();
	let hash = await bcrypt.hash(this.password, salt);
	this.password = hash;
	next();
});

UserSchema.methods.isValidPwd = async function (password) {
	let isMatchPwd = await bcrypt.compare(password, this.password);
	return isMatchPwd;
};

UserSchema.methods.generateToken = function () {
	const token = jwt.sign(
		{
			_id: this._id,
			userId: this.userId,
			role: this.role
		},
		process.env.JWT_PRIVATE_KEY
	);
	return token;
};

module.exports = mongoose.model("user", UserSchema);
