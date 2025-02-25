// import {Server} from "socket.io";
// import http from "http";
// import { app } from "../app.js";




// const server = http.createServer(app);
// const io = new Server(server, {
    
// //     cors:{
// //         origin:['http://localhost:5173'],
// //         methods:['GET', 'POST'],
// //     },
// // });
// // // io.on('connection',(socket) => {
// // //     console.log("USER CONNECT ",socket.id);
// // // })

// // console.log(app);

// const server = http.createServer(app);
// const io = new Server(server);  // No need for additional CORS here

// // Handle connection event
// io.on('connection', (socket) => {
//     console.log(`New user connected with socket ID: ${socket.id}`);
//     // Additional logic for when a user connects
// });

// // Start the HTTP server and listen on a specific port
// const PORT = 8001;






// export const getReceiverSocketId = (receiverId) => {
//     return userSocketMap[receiverId];
// }

// const userSocketMap = {}; // {userId->socketId}


// io.on('connection', (socket)=>{
//     console.log("connection",socket.id);
//     console.log("socket Hand Shake", socket);
//     const userId = socket.handshake.query.userId
//     console.log("Handshake Query: ", socket.handshake.query);

//     if(userId !== undefined){
//         userSocketMap[userId] = socket.id;
//     } 

//     io.emit('getOnlineUsers',Object.keys(userSocketMap));

//     socket.on('disconnect', ()=>{
//         console.log("disconnected",socket.id);
//         delete userSocketMap[userId];
//         io.emit('getOnlineUsers',Object.keys(userSocketMap));
//     })

// })
// server.listen(PORT, () => {
//     console.log(`Socket.IO server is running on port ${PORT}`);
// });

// export { io, server};




