const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const fs = require('fs');
const targetFile = './watched-file.json';

if (cluster.isMaster) {
	console.log(`${process.pid} - Master started`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
	console.log(`${process.pid} - Worker started`);
}

fs.watch(targetFile, (eventType, filename) => {
  fs.readFile(targetFile, 'utf8', function (err, data) {
    if (err) throw err;
    process.env.CONTENT = data;
    console.log(`${process.pid} - ${process.env.CONTENT}`);
  });
});