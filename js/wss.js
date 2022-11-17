import * as store from "./store.js";
import * as ui from "./ui.js";
import * as webRTCHandler from "./webRTCHandler.js";

let socketIO = null;

export const registerSocketEvents = (socket) => {

    socket.on("connect", () => {
        socketIO = socket;

        console.log("successfully connected to socket.io server");
        store.setSocketId(socket.id);
        ui.updatePersonalCode(socket.id);
    });

    // when pre offer is received by the listener 
    socket.on("pre-offer", (data) => {
        console.log("pre offer came");
        webRTCHandler.handlePreOffer(data);
    });

    socket.on("pre-offer-answer", (data) => {
        webRTCHandler.handlePreOfferAnswer(data);
    });
};

export const sendPreOffer = (data) => {
    console.log("emitting to server pre offer event");
    socketIO.emit("pre-offer", data);
};

export const sendPreOfferAnswer = (data) => {
    socketIO.emit("pre-offer-answer", data);
};