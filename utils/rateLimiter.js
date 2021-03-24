const rateLimit = require("express-rate-limit");

module.exports.apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 200,
	message:
		"Too many accounts created from this IP, please try again after an hour"
});
