const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		image: {
			type: String,
			default: "images"
		},
		barcode: {
			type: String,
			default: "barcode"
		},
		category: {
			type: String,
			required: true
		},
		price: {
			type: Number,
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model("product", ProductSchema);
