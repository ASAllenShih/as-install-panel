const inquirer = require('./inquirer');
const { acceptList } = require('./acceptList');
const { getConfig } = require('./config');
const { exec } = require('./exec');
const execpath = getConfig('execpath');
const sourceList = [];
if (getConfig('pip')) {
	sourceList.push('pip');
}
if (getConfig('npm')) {
	sourceList.push('npm');
}
sourceList.push('退出');
async function select() {
	const { source } = await inquirer.prompt([
		{
			type: 'list',
			name: 'source',
			message: '請選擇安裝來源',
			choices: sourceList,
		},
	]);
	if (source == '退出') {
		console.log('退出安裝程式。');
		process.exit(0);
	}
	await packageSelect(source);
}
async function packageSelect(source) {
	const total = await acceptList();
	/**
	 * @type {string[]}
	 */
	const packageList = total[source] ?? [];
	packageList.push('返回');
	switch (source) {
		case 'npm':
			packageList.push('全部安裝');
			break;
	}
	const { package } = await inquirer.prompt([
		{
			type: 'input',
			name: 'package',
			message: '請選擇要安裝的套件',
			choices: packageList,
			async validate(input) {
				if (packageList.includes(input) || ( (input.replaceAll(' ', '') !== '') && (packageList.includes('*')))) {
					return true;
				}
				const option = packageList.filter((item) => item.includes(input)).sort().join('、');
				return `請輸入管理員有允許的套件名稱或行為。依目前輸入可選的有：${option}`;
			},
		},
	]);
	switch (package) {
		case '返回':
			await select();
			return;
	}
	const { confirm } = await inquirer.prompt([
		{
			type: 'confirm',
			name: 'confirm',
			message: `確定要在${source}安裝${package}嗎？`,
		},
	]);
	if (!confirm) {
		await packageSelect(source);
		return;
	}
	switch (package) {
		case '全部安裝':
			console.log('正在安裝全部套件...');
			const output = await exec(`${source} install`, execpath);
			console.log(output.stdout);
			console.log(output.stderr);
			console.log('安裝完成。');
			await packageSelect(source);
			return;
		default:
			console.log(`正在安裝${package}...`);
			const output2 = await exec(`${source} install ${package}`, execpath);
			console.log(output2.stdout);
			console.log(output2.stderr);
			console.log('安裝完成。');
			await packageSelect(source);
			return;
	}
}
module.exports = {
	select,
};