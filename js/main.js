//we are defining the connection from the client side to the socket.



import * as store from "./store.js"; // allows us to get access to all of the exported functions 

import * as wss from "./wss.js";
import * as webRTCHandler from "./webRTCHandler.js";
import * as constants from "./constants.js";

// initialization of socketIO connection
const socket = io("/"); // as the port that we are using id under the sam directory we can use '/' symbol to fetch it 

/*
const socket = io('localhost:3000')  // we tell our socket io that socket server is found in 'localhost:3000'
*/


wss.registerSocketEvents(socket);

//register event listener for personal code copy button
const personalCodeCopyButton = document.getElementById(
    "personal_code_copy_button"
);
personalCodeCopyButton.addEventListener("click", () => {
    const personalCode = store.getState().socketId;
    navigator.clipboard && navigator.clipboard.writeText(personalCode);
});

// register event listeners for connection buttons

const personalCodeChatButton = document.getElementById(
    "personal_code_chat_button"
);

const personalCodeVideoButton = document.getElementById(
    "personal_code_video_button"
);

personalCodeChatButton.addEventListener("click", () => {
    console.log("chat button clicked");

    const calleePersonalCode = document.getElementById(
        "personal_code_input"
    ).value;
    const callType = constants.callType.CHAT_PERSONAL_CODE;

    webRTCHandler.sendPreOffer(callType, calleePersonalCode);
});

personalCodeVideoButton.addEventListener("click", () => {
    console.log("video button clicked");

    const calleePersonalCode = document.getElementById(
        "personal_code_input"
    ).value;
    const callType = constants.callType.VIDEO_PERSONAL_CODE;

    webRTCHandler.sendPreOffer(callType, calleePersonalCode);
});