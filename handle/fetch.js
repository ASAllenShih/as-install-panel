const fetch = require('fix-esm').require('node-fetch').default;
async function networkRequest(url) {
	console.log('正在從網路請求資料...');
	const res = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (res.status != 200) {
		console.error(`網路請求錯誤：${res.status} ${res.statusText}`);
		process.exit(1);
	}
	try {
		const data = await res.json();
		console.log('網路請求成功');
		return data;
	}
	catch (e) {
		console.error(`網路資料解碼錯誤：${e}`);
		process.exit(1);
	}
}
module.exports = {
	networkRequest,
};