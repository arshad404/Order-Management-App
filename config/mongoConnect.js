const mongoose = require("mongoose");
require("dotenv").config();

const connect = () => {
	mongoose.connect(
		process.env.MONGO_URI,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		},
		err => {
			if (err) {
				console.log(`Error`, err.message);
			}
		}
	);
};

module.exports = connect;
