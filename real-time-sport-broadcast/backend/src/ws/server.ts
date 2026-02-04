import { WebSocket, WebSocketServer } from "ws";
import type { RawData } from "ws";
import { Server } from "node:http";
import { CreateMatch } from "@/validation/matches";

interface ExtendedWebSocket extends WebSocket {
  isAlive?: boolean;
  subscriptions: Set<string>;
}

const matchSubscribers: Map<string, Set<ExtendedWebSocket>> = new Map();

function subscribe(matchId: string, socket: ExtendedWebSocket) {
  if (!matchSubscribers.has(matchId)) {
    matchSubscribers.set(matchId, new Set());
  }

  matchSubscribers.get(matchId)?.add(socket);
  socket.subscriptions.add(matchId);
}

function unsubscribe(matchId: string, socket: ExtendedWebSocket) {
  const subscribers = matchSubscribers.get(matchId);
  if (!subscribers) return;

  subscribers.delete(socket);
  socket.subscriptions.delete(matchId);

  if (subscribers.size === 0) {
    matchSubscribers.delete(matchId);
  }
}

function cleanupSubscribers(socket: ExtendedWebSocket) {
  for (const matchId of socket.subscriptions) {
    unsubscribe(matchId, socket);
  }
}

function sendJson(socket: WebSocket, payload: any) {
  if (socket.readyState !== WebSocket.OPEN) return;

  socket.send(JSON.stringify(payload));
}

function broadcastToAll(wss: WebSocketServer, payload: any) {
  for (const client of wss.clients) {
    if (client.readyState !== WebSocket.OPEN) continue;

    client.send(JSON.stringify(payload));
  }
}

function broadcastToMatch(matchId: string, payload: any) {
  const subscribers = matchSubscribers.get(matchId);
  if (!subscribers || subscribers.size === 0) return;

  const message = JSON.stringify(payload);
  for (const client of subscribers) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}

function handleMessage(socket: ExtendedWebSocket, data: RawData) {
  let message;
  try {
    const text = typeof data === "string" ? data : data.toString();
    message = JSON.parse(text);
  } catch (error) {
    sendJson(socket, { type: "error", message: "Invalid JSON" });
  }

  if (message?.type === subscribe && Number.isInteger(message.matchId)) {
    subscribe(message.matchId, socket);
    socket.subscriptions.add(message.matchId);
    sendJson(socket, { type: "subscribed", matchId: message.matchId });
    return;
  }

  if (message?.type === unsubscribe && Number.isInteger(message.matchId)) {
    unsubscribe(message.matchId, socket);
    socket.subscriptions.delete(message.matchId);
    sendJson(socket, { type: "unsubscribed", matchId: message.matchId });
    return;
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
    });

    socket.subscriptions = new Set();

    socket.on("message", (data) => {
      handleMessage(socket, data);
    });

    socket.on("error", () => {
      socket.terminate();
    });

    socket.on("close", () => {
      cleanupSubscribers(socket);
    });

    socket.on("error", console.error);
  });

  const interval = setInterval(() => {
    wss.clients.forEach((ws: any) => {
      if (ws.isAlive === false) return ws.terminate();

      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);

  wss.on("close", () => {
    clearInterval(interval);
  });

  function broadcastMatchCreated(match: CreateMatch) {
    broadcastToAll(wss, { type: "match_created", data: match });
  }

  function broadcastCommentary(matchId: number, comment: any) {
    broadcastToMatch(matchId.toString(), {
      type: "commentary",
      data: comment,
    });
  }

  return { broadcastMatchCreated, broadcastCommentary };
}
