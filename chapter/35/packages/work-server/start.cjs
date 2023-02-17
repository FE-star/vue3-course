/* eslint-disable no-undef */
const cluster = require('cluster');
const path = require('path');
const os = require('os');

const processCount = os.cpus().length;
const entryFile = path.join(__dirname, 'dist', 'index.cjs');

cluster.setupMaster({
  exec: entryFile
});

// 根据CPU核数，启动多进程
for (let i = 0; i < processCount; i++) {
  cluster.fork();
}
