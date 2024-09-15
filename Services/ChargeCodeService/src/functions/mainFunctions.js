const axios = require("axios");

async function createNewUserAndWallet(phoneNumber) {
	await axios
		.post(`${process.env.WALLET_SERVICE_URL}`, { phoneNumber })
		.then((res) => {
			return res.data;
		});
}

async function getUserIdAndWalletId(phoneNumber) {
	await axios
		.get(`${process.env.WALLET_SERVICE_URL}/${phoneNumber}`)
		.then((res) => {
			return res.data;
		});
}

async function createNewTransaction(wholeObject) {
	await axios.post(`${process.env.TRANSACTION_SERVICE_URL}`, { wholeObject });
}

async function updateUserBalance(value) {
	await axios.patch(`${process.env.WALLET_SERVICE_URL}/balance`, {
		type: "increase",
		value,
	});
}

module.exports = {
	createNewUserAndWallet,
	getUserIdAndWalletId,
	createNewTransaction,
	updateUserBalance,
};
