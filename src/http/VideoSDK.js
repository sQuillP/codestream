import axios from 'axios';

export const DEV_AUTH ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIwNGE3MDNhNC02ODQ3LTRhNDYtOGNiZC04N2Q4MGVmMWM5ZGEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyNzQ3NzY5NCwiZXhwIjoxNzI4MDgyNDk0fQ.GqTosSqxTXvxQvGNCn-yKIx_q5LzVtwe9ghvNgQy11Y';


//custom endpoint
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