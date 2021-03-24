const mongooose = require("mongoose");
const Schema = mongooose.Schema;

const OrderLogSchema = new Schema(
	{
		status: {
			type: String,
			enum: [
				"CREATED",
				"CONFIRMED",
				"PROCESSING",
				"SHIPPED",
				"DELIVERED",
				"COMPLETE"
			],
			default: "CREATED"
		},
		description: {
			type: String,
			required: true
		},
		updatedAt: {
			type: String,
			required: true
		},
		updatedOn: {
			type: Date,
			default: Date.now
		}
	},
	{ timestamps: true }
);

module.exports = mongooose.model("orderLog", OrderLogSchema);
