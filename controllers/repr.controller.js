const VisitDB = require("../models/DailyVisit.model");

module.exports.dailyVisit = async (req, res) => {
	try {
		let { shops, orderList } = req.body;
		let visit = new VisitDB({
			shops,
			orderList
		});
		await visit.save();
		res.status(200).send("Visit done");
	} catch (error) {
		console.log(error);
	}
};
