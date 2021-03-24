const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const stringGen = require("../../utils/stringGenerator");

const OrderSchema = new Schema(
	{
		orderId: Schema.Types.ObjectId,
		batches: [
			{
				productDetails: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "product"
				},
				quantity: {
					type: Number,
					required: true
				},
				price: {
					type: Number
				}
			}
		],
		createdOn: {
			type: Date,
			default: Date.now
		},
		OrderStatus: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "orderLog"
			}
		],
		history: [
			{
				type: Schema.Types.ObjectId
			}
		],
		transactionId: {
			type: String,
			default: stringGen.defaultTransactionId
		},
		totalPrice: {
			type: Number,
			required: true
		},
		orderBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		},
		orderTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		},
		orderShop: {
			type: String
		},
		orderConfirm: {
			type: Boolean
		},
		userId: {
			type: String
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model("order", OrderSchema);
