const mongooose = require("mongoose");
const Schema = mongooose.Schema;
const jwt = require("jsonwebtoken");

const AdminSchema = new Schema(
	{
		info: {
			type: mongooose.Schema.Types.ObjectId,
			ref: "user"
		},
		orders: [],
		userId: {
			type: String
		},
		role: {
			type: String,
			default: "ADMIN"
		}
	},
	{ timestamps: true }
);

module.exports = mongooose.model("admin", AdminSchema);
