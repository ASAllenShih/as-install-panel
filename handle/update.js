const { exec } = require('./exec');
const { getConfig } = require('./config');
async function update() {
	switch (getConfig('update')) {
		case true:
			console.log('正在檢查更新...');
			const git = await exec('git pull');
			if (!git.stdout.includes('Already up to date.')) {
				console.log('安裝程式已更新至最新版本，請重新啟動程式。');
				process.exit(0);
			}
			console.log('安裝程式已經是最新版本。');
			break;
		case false:
			break;
		default:
			console.error('config.json錯誤：update選項錯誤(應為true/false)');
			process.exit(1);
	}
}
module.exports = {
	update,
};