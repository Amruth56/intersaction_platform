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

    // listener defined o listen to the pre offer
    socket.on("pre-offer", (data) => {
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