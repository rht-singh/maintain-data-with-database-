const http = require("http");

exports.Server = (app) => {
  http.createServer(app);
};
