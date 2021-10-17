import socket from "socket.io";


let users = [];

const addUser = (userName, roomId) => {
    users.push({
        userName, roomId
    });
}

const userLeave = (userName) => {
    users = users.filter(user => user.userName != userName);
}

const getRoomUsers = (roomId) => {
    return users.filter(user => (user.roomId == roomId));
}

const listeners = (server) => {
    const io = socket(server, {
        cors: {    
            origin: "http://localhost:19006",    
            methods: ["GET", "POST"]  } }
        )

    io.on("connection", socket => {
        console.log("someone connected");
        socket.on("join-room", ({roomId, userName}) => {
            console.log("User "+userName+ " Joined room: "+roomId);
            if (roomId && userName){
                socket.join(roomId);
                addUser(userName, roomId);
                socket.to(roomId).emit("user-connected", userName);

                io.to(roomId).emit("all-users", getRoomUsers(roomId));
            }
            socket.on("disconnect", ()=> {
                console.log("user "+userName+" disconnected from: "+roomId);
                socket.leave(roomId);
                userLeave(userName);
                io.to(roomId).emit("all-users",getRoomUsers(roomId));
            })
        })
    })
}


export default listeners
