const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DailyVisitModel = new Schema({
	shops: [],
	visitData: {
		type: Date,
		default: Date.now
	},
	orderList: []
});

module.exports = mongoose.model("dailyVisit", DailyVisitModel);
