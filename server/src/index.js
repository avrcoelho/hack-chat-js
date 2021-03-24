import SocketServer from "./socket.js";
import Event from "events";
import { constants } from "./constants.js";
import COntroller from "./controller.js";

const eventEmiiter = new Event();

// async function testServer() {
//   const options = {
//     port: 9898,
//     host: "localhost",
//     headers: {
//       Connection: "Upgrade",
//       Upgrade: "websocket",
//     },
//   };

//   const http = await import("http");
//   const req = http.request(options);
//   req.end();

//   req.on("upgrade", (res, socket) => {
//     socket.on("data", (data) => {
//       console.log("client received", data.toString());
//     });

//     setInterval(() => {
//       socket.write("hello");
//     }, 500);
//   });
// }

const port = process.env.PORT || 9898;
const socketServer = new SocketServer({ port });
const server = await socketServer.initialize(eventEmiiter);
console.log("socket server is running at", server.address().port);

const controller = new COntroller({ socketServer });

eventEmiiter.on(
  constants.event.NEW_USER_CONNECTED,
  controller.onNewConnection.bind(controller)
);
