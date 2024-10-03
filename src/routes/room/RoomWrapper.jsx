import { MeetingProvider } from "@videosdk.live/react-sdk";
import Room from "./Room";
import { useLocation } from "react-router-dom";



export const authToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIwNGE3MDNhNC02ODQ3LTRhNDYtOGNiZC04N2Q4MGVmMWM5ZGEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyNzQ3NzY5NCwiZXhwIjoxNzI4MDgyNDk0fQ.GqTosSqxTXvxQvGNCn-yKIx_q5LzVtwe9ghvNgQy11Y';

export default function RoomWrapper() {

    const location = useLocation();


    return (
        <>
            {
                authToken && location.state.roomId && (
                    <MeetingProvider
                        config={{
                            meetingId: location?.state?.roomId,
                            micEnabled: true,
                            webcamEnabled: true,
                            name: location.state.username
                        }}
                        token={authToken}
                    >
                        <Room/>
                    </MeetingProvider>
                )
            }
        </>
    )
}