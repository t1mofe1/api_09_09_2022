import cluster from 'cluster';
import os from 'os';

const threads = os.cpus().length;

export const runInCluster = (process: CallableFunction) => {
  if (cluster.isPrimary) {
    for (let i = 0; i < threads; i++) {
      const fork = cluster.fork();

      fork.on('exit', () => fork.destroy());
    }
  } else {
    process();
  }
};

export default runInCluster;
