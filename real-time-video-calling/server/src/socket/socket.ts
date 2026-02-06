import { Server } from "node:http";
import { Server as SocketIOServer } from "socket.io";

export function setupSocket(server: Server) {
  const io = new SocketIOServer(server, {
    pingTimeout: 60000,
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    },
  });

  console.log("Socket.IO server initialized");

  let onlineusers: any[] = [];

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.emit("me", socket.id);

    socket.on("join", (user) => {
      if (!user || !user._id) {
        console.error("Invalid user data received in join event:", user);
        return;
      }

      socket.join(user._id);

      const existingUser = onlineusers.find((u) => u._id === user._id);
      if (existingUser) {
        existingUser.socketId = socket.id;
      } else {
        onlineusers.push({ ...user, socketId: socket.id });
      }

      io.emit("online-users", onlineusers);
    });

    socket.on("disconnect", () => {
      onlineusers = onlineusers.filter((u) => u.socketId !== socket.id);
      io.emit("online-users", onlineusers);

      socket.broadcast.emit("disconnect-user", {
        disuser: socket.id,
      });
      console.log("user disconnected", socket.id);
    });
  });
}
