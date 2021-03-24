const cryptoRandomString = require("crypto-random-string");
let defaultTransactionId = cryptoRandomString({ length: 16 });
let defaultOrderId = cryptoRandomString({ length: 12 });

module.exports = {
	defaultTransactionId,
	defaultOrderId
};
