import childProcess from 'child_process';
import net from 'node:net';
import path from 'node:path';
import kill from 'kill-port';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import nodeFetch from 'node-fetch';

let workServerProcess: any | childProcess.ChildProcessWithoutNullStreams;

export const workServerPort = 8001;

export const workServerHost = '127.0.0.1';

export { nodeFetch };

export async function cleanPort(): Promise<void> {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once('error', function (err: any) {
      if (err.code === 'EADDRINUSE') {
        kill(workServerPort, 'tcp')
          .then(() => {
            resolve();
          })
          .catch(reject);
      } else {
        resolve();
      }
    });
    server.once('listening', function () {
      server.close();
      resolve();
    });
    server.listen(workServerPort);
  });
}

export async function startWorkServer(): Promise<void> {
  return new Promise((resolve, reject) => {
    const index = path.join(__dirname, '..', 'src', 'index.ts');
    const node: childProcess.ChildProcessWithoutNullStreams =
      childProcess.spawn('vite-node', [index]);
    node.stdout.on('data', (data) => {
      // eslint-disable-next-line no-console
      console.log(`stdout: ${data}`);
      resolve();
    });

    node.stderr.on('data', (data) => {
      // eslint-disable-next-line no-console
      console.error(`stderr: ${data}`);
      reject();
    });

    workServerProcess = node;
  });
}

export async function closeWorkServer() {
  if (workServerProcess && typeof workServerProcess.close === 'function') {
    workServerProcess.close();
    workServerProcess = null;
  }
}
