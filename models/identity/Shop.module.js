const mongooose = require("mongoose");
const Schema = mongooose.Schema;

const ShopSchema = new Schema(
	{
		shopId: Schema.Types.ObjectId,
		name: {
			type: String,
			required: true
		},
		products: [
			{
				type: mongooose.Schema.Types.ObjectId,
				ref: "product"
			}
		],
		category: {
			type: String,
			required: true
		},
		ownerId: {
			type: mongooose.Schema.Types.ObjectId,
			ref: "shopkeeper"
		}
	},
	{ timestamps: true }
);

module.exports = mongooose.model("shop", ShopSchema);
