import { WebSocket } from "ws";

declare global {
  namespace WS {
    interface WebSocket {
      isAlive?: boolean;
    }
  }
}

// Extend WebSocket with isAlive property
declare module "ws" {
  interface WebSocket {
    isAlive?: boolean;
  }
}
