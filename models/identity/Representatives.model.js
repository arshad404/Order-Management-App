const mongooose = require("mongoose");
const Schema = mongooose.Schema;

const RepresentativeSchema = new Schema(
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
			default: "REPRESENTATIVE"
		},
		visits: [
			{
				visitId: Schema.Types.ObjectId,
				visitedShop: {
					type: mongooose.Schema.Types.ObjectId,
					ref: "shop"
				},
				visitDate: {
					type: Date,
					default: Date.now
				}
			}
		],
		shops: []
	},
	{ timestamps: true }
);

representative = mongooose.model("representative", RepresentativeSchema);
module.exports = representative;
