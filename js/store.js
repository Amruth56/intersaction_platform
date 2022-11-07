let state = {
    socketId: null,
    localStream: null,
    remoteStream: null,
    screenSharingStream: null,
    allowConnectionsFromStrangers: false,
    screenSharingActive: false,

};

export const sectSocketId = (socketId) => {
    state = {
        ...state,
        socketId
    };
};

export const setLocalStream = (stream) => {
    state = {
        ...state,
        localStream: stream
    }
}

export const setAllowConnectionsFromStrangers = (allowConnection) => {
    state = {
        ...state,
        allowConnectionsFromStrangers: allowConnection
    }
}

export const setScreenSharingActive = (screenSharingActive) => {
    state = {
        ...state,
        screenSharingActive,
    };
};

export const setScreenSharingStream = (stream) => {
    state = {
        ...state,
        screenSharingActive: stream,
    };
};

export const setRemoteStream = (stream) => {
    state = {
        ...state,
        remoteStream: stream,
    };
};


// function to access all these properties that we have created 

export const getState = () => {
    return state;
}