const { networkRequest } = require('./fetch');
const { getConfig } = require('./config');
let data = undefined;
async function acceptList() {
	if (data == undefined) {
		const url = getConfig('list');
		data = await networkRequest(url);
	};
	return data;
}
module.exports = {
	acceptList,
};