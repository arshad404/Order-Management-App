const ProductDB = require("../models/order/Product.model");
const multer = require("multer");
const fs = require("fs");

module.exports.addProduct = async (req, res) => {
	let { name, description, image, barcode, category, price } = req.body;
	let product = new ProductDB({
		name,
		description,
		image,
		barcode,
		category,
		price
	});
	await ProductDB.create(product);
	res.status(200).send("Your product added successfully");
};

module.exports.addPicOfProduct = async (req, res) => {
	try {
		let { productId } = req.params;
		let picturePath = req.files;
		picturePath = picturePath[0].path;
		await ProductDB.findOneAndUpdate(
			{ _id: productId },
			{
				$set: { image: picturePath }
			},
			(err, doc) => {
				if (err) {
					console.log(err);
					return res
						.status(400)
						.send("unable to update");
				}
				return res.status(200).send("Photos added");
			}
		);
	} catch (error) {
		console.log(error);
		return res.status(400).send("Unable to upload image");
	}
};

var storage = multer.diskStorage({
	destination: (req, file, callback) => {
		var dir = "./uploads";
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
		callback(null, dir);
	},
	filename: (req, file, callback) => {
		callback(null, file.originalname);
	}
});

module.exports.upload = multer({ storage: storage }).array("images", 5);
