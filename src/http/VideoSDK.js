import axios from 'axios';



export const TOKEN_STORAGE_KEY = 'devstreamer-videosdk-token';

export const createMeeting = async ({ token }) => {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
        authorization: `${token}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
    });
    //Destructuring the roomId from the response
    const { roomId } = await res.json();
    return roomId;
};


export async function getVideoSDKToken() {
    const videoSDKResponse = await videoSDK.get('/videosdk');
    if(videoSDKResponse.status !== 200) {
        throw new Error("Unable to connect to videos tream");
    }
    const token = videoSDKResponse.data.data;
    return token;
}



//axios configuration for any calls pertaining to videoSDK
export const videoSDK = axios.create({
    baseURL:'https://b5y39ec32c.execute-api.us-east-2.amazonaws.com/PROD',
});