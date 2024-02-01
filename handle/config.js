const configmain = process.env;
const config = require('../config.json');
function getConfig(name) {
	if (configmain[name] == undefined) {
		if (config[name] == undefined) {
			console.error(`config.json錯誤：找不到${name}選項`);
			process.exit(1);
		}
		return config[name];
	}
	return configmain[name];
}
module.exports = {
	getConfig,
};