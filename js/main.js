//we are defining the connection from the client side to the socket.



import * as store from './store.js' // allows us to get access to all of the exported functions 

const socket = io('/'); // as the port that we are using id under the sam directory we can use '/' symbol to fetch it 

/*
const socket = io('localhost:3000')  // we tell our socket io that socket server is found in 'localhost:3000'
*/



// socket.on --> Set up callback functions for various events on the WebSocket connection.

// 1st we try to connect to the server and if the connection is a success then we would like to console successfully connected to web socket server 
socket.on('connect', () => {
    console.log('successfully connected to socket.io server ');
    // console.log(socket.id);
    store.sectSocketId(socket.id);
});