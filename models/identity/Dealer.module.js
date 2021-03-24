const mongooose = require("mongoose");
const Schema = mongooose.Schema;

const DealerSchema = new Schema(
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
			default: "DEALER"
		}
	},
	{ timestamps: true }
);

const dealer = mongooose.model("dealer", DealerSchema);
module.exports = dealer;
