let cluster = require('cluster');

if (cluster.isMaster) {
  // Count the machine's CPUs
  let cpuCount = require('os').cpus().length

  // Create a worker for each CPU
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork()
  }

  // Listen for dying workers
  cluster.on('exit', () => {
    cluster.fork()
  })
}
else
  require('./server')
