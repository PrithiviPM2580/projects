import { WebSocket, WebSocketServer } from "ws";
import { Server } from "node:http";
import { CreateMatch } from "@/validation/matches";

interface ExtendedWebSocket extends WebSocket {
  isAlive?: boolean;
}

function sendJson(socket: WebSocket, payload: any) {
  if (socket.readyState !== WebSocket.OPEN) return;

  socket.send(JSON.stringify(payload));
}

function broadcast(wss: WebSocketServer, payload: any) {
  for (const client of wss.clients) {
    if (client.readyState !== WebSocket.OPEN) continue;

    client.send(JSON.stringify(payload));
  }
}

export function setupWebSocketServer(server: Server) {
  const wss = new WebSocketServer({
    server,
    path: "/ws",
    maxPayload: 1024 * 1024,
  });

  wss.on("connection", (socket: ExtendedWebSocket) => {
    socket.isAlive = true;
    socket.on("pong", () => {
      socket.isAlive = true;
      sendJson(socket, { type: "welcome" });
      socket.on("error", console.error);
    });

    const interval = setInterval(() => {
      wss.clients.forEach((ws: any) => {
        if (ws.isAlive === false) return ws.terminate();

        ws.isAlive = false;
        ws.ping();
      });
    }, 30000);

    socket.on("close", () => {
      clearInterval(interval);
    });
  });

  function broadcastMatchCreated(match: CreateMatch) {
    broadcast(wss, { type: "match_created", data: match });
  }

  return { broadcastMatchCreated };
}
