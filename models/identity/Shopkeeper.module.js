const mongooose = require("mongoose");
const Schema = mongooose.Schema;

const ShopkeeperSchema = new Schema(
	{
		info: {
			type: mongooose.Schema.Types.ObjectId,
			ref: "user"
		},
		userId: {
			type: String
		},
		orders: [],
		role: {
			type: String,
			default: "SHOPKEEPER"
		}
		// shops: [
		// 	{
		// 		type: mongooose.Schema.Types.ObjectId,
		// 		ref: "shop"
		// 	}
		// ]
	},
	{ timestamps: true }
);

module.exports = mongooose.model("shopkeeper", ShopkeeperSchema);
