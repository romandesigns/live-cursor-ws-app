const http = require("http");
const { WebSocketServer } = require("ws");
const url = require("url");
const uuidv4 = require("uuid").v4;

const server = http.createServer();
const wss = new WebSocketServer({ server });
const PORT = 8000;

//Keeping track of connections and users
const connections = {};
const users = {};

const broadCastUsers = () => {
  Object.keys(users).map((uuid) => {
    const connection = connections[uuid];
    const message = JSON.stringify(users);
    connection.send(message);
  });
};

const handleMessage = (bytes, uuid) => {
  const message = JSON.parse(bytes.toString());
  users[uuid].state = message;
  broadCastUsers();
  console.log(
    `${users.username} updated their state: ${JSON.stringify(user.state)}`
  );
};

const handleClose = (uuid) => {
  console.log(`Connection closed: ${uuid}`);
  delete connections[uuid];
  delete users[uuid];
  broadCastUsers();
};

wss.on("connection", (connection, request) => {
  //ws://localhost:8080?username=Roman
  const { username } = url.parse(request.url, true).query;
  const uuid = uuidv4();

  connections[uuid] = connection;
  users[uuid] = {
    username,
    state: {},
  };
  connection.on("message", (message) => handleMessage(message, uuid));
  connection.on("close", () => handleClose(uuid));
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
