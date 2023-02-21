import fs from "fs";
import { createSecureServer } from "http2";
import serveStatic from "serve-static";
import finalhandler from "finalhandler";
import { authenticateUser } from "./auth.js";
import { addSubtitles } from "./subtitles.js";
import { WebSocketServer, WebSocket } from "ws";

if (fs.existsSync("./public/videos/output_vtt.m3u8")) addSubtitles();

const serve = serveStatic("./public");

const options = {
  key: fs.readFileSync("./keys/privkey.pem"),
  cert: fs.readFileSync("./keys/fullchain.pem"),
  allowHTTP1: true,
};

const server = createSecureServer(options, (req, res) => {
  authenticateUser(req, res);
  serve(req, res, finalhandler(req, res));
});

const wss = new WebSocketServer({ server, path: "/ws" });

server.listen(443, () => {
  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    ws.onerror = (err) => {
      console.error(err);
    };

    const interval = setInterval(function ping() {
      ws.ping();
    }, 60000);

    ws.on("close", () => {
      clearInterval(interval);
    });
  });

  console.log("Server started on port 443");
});
