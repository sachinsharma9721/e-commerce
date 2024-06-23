const http = require("http");
const app = require("./app.js");
const { PORT, NODE_ENV } = require("./config.js");

const port = PORT || 3000;

const server = http.createServer(app);

server.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`server running on ${port}`);
});
