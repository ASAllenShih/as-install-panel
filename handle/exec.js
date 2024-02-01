const nodeexec = require('child_process').exec;
function exec(command, path = process.cwd()) {
	return new Promise((resolve, reject) => {
		nodeexec(command, { cwd: path }, (err, stdout, stderr) => {
			if (err) {
				console.error('錯誤：' + err);
				reject(err);
				process.exit(1);
			}
			else {
				resolve({ stdout, stderr });
			}
		});
	});
}
module.exports = {
	exec,
};