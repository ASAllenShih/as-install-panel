const { update } = require('./handle/update');
const { acceptList } = require('./handle/acceptList');
const { select } = require('./handle/select');
async function main() {
	await update();
	const list = await acceptList();
	await select();
}
main();