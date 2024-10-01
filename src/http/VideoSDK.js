import axios from 'axios';


export async function getVideoSDKAuthToken() {
    const token_url = "";
    try {
        const tokenResponse = await axios.get(token_url);
        const token = tokenResponse.data.data;
        return token;
    } catch(error) {
        return "";
    }
}


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



//axios configuration for any calls pertaining to videoSDK
export const videoSDK = axios.create({
    baseURL:'https://api.videosdk.live/v2',
});