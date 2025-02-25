import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import { hellomsg } from "./src/routes/hello.msg.js";
import userRoute from "./src/routes/user.route.js";
import userMessage from "./src/routes/message.route.js";
import { Socket } from "dgram";
// import { Server } from "socket.io"
// import cart from './route/cart.route.js'

//  All Routes
app.use("/api/v1/", hellomsg);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", userMessage);
// app.use("/api/v1/cart",cart);

// app.use((req, res, next) => {
//     // Assume tokenValue is obtained from your authentication logic
//     const tokenValue = "your_auth_token"; // Replace this with your actual token
//     res.cookie("token", tokenValue, {
//         httpOnly: true,
//         secure: true,      // Set to true if using HTTPS
//         sameSite: "None",  // Allows the cookie to be sent in cross-origin requests
//     });
//     next();
// });

const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173", // Replace with your client origin
//     methods: ["GET", "POST"],
//     credentials: true, // Needed if withCredentials is set on the client side
//   },
// });

// // Listen for client connections
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   // Example: Send message to client
//   socket.emit("welcome", "Hello from the backend!");

//   // Handle client message
//   socket.on("message", (data) => {
//     console.log("Message from client:", data);
//     // Respond back
//     socket.emit("response", "Message received!");
//   });

//   // Handle disconnect
//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// server.listen(3000, () => {
//   console.log("Server running on http://localhost:s000");
// });

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your client origin
    methods: ["GET", "POST"],
    credentials: true, // Needed if withCredentials is set on the client side
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {};
// console.log("userSocketMap", userSocketMap);
// Listen for client connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userID = socket.handshake.query.userID;
  if (userID !== undefined) {
    userSocketMap[userID] = socket.id;
    console.log("hiijsh", userSocketMap[userID]);
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Example: Send message to client
  socket.emit("welcome", "Hello from the backend!");

  // Handle client message
  socket.on("message", (data) => {
    console.log("Message from client:", data);
    // Respond back
    socket.emit("response", "Message received!");
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete userSocketMap[userID];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:s000");
});

export { app, io, server };
