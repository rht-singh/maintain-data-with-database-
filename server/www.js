const app = require("../app");
const { Server } = require("./http");
const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });

Server(app);
