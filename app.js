const express = require("Express");
const http = require("http");
const { Socket } = require("socket.io");

const PORT = process.env.PORT || 3000; // process.env.PORT if we are hosting our app n 3000 if we are not hosting our app


// creating application 
const app = express(); //Express is a node js web application framework that provides broad features for building web and mobile applications. 


//creating server to pass the application
const server = http.createServer(app);


//  connect the server with socket.io
const io = require("socket.io")(server);

app.use(express.static("public")); // to access the files from public folder which is outside of this server 


//1st route (when someone opens the server)
app.get('/', (req, res) => { // express request and response 
    res.sendFile(__dirname + "/public/index.html"); // dirname is the domain name where we are storing our project 
});



// to store the connected users in our server 
let connectedPeers = [];



//  to check the socket.io connection
//  function that will be executed when someone connects to the server 
io.on('connection', (Socket) => {
    connectedPeers.push(socket.id);
    // if connection has occurred then we will get the information through socket.id
    console.log(connectedPeers)


    // when client receives a connection code 
    socket.on("pre-offer", (data) => {

        //if pre offer has arrived then 
        console.log("pre-offer-came");
        const { calleePersonalCode, callType } = data;

        // to check if the user exists or if he is available to take calls or chats
        const connectedPeers = connectPeers.find((peerSocketId) => {
            peerSocketId === calleePersonalCode; // both will be the same if connect peers is found 
        });
        //if the client exists 
        if (connectedPeer) {
            const data = {
                callerSocketId: socket.id,
                callType,
            };
            //to whom we are connected 
            io.to(calleePersonalCode).emit('pre-offer', data);

        }


    });


    //if the client disconnects 
    socket.on('disconnect', () => {
        console.log("User disconnected ");
        //to update the array if the client disconnects 
        const newConnectedPeers = connectedPeers.filter((peerSocketId) => {
            peerSocketId !== socket.id;
        });
        connectedPeers = newConnectedPeers;
    })
});


/*

// eg_1 : Adding new route 
app.get("/hello", (req, res) => {
    res.send("hello"); // response 
});

//  eg_2 : Adding new route 
app.get("/hello-world", (req, res) => {
    res.send("hello-world"); // response 
});

*/


// start the server to run the application 
server.listen(PORT, () => {
    console.log(`listening on ${PORT}`); // we will get the information that on which port we are listening 
});