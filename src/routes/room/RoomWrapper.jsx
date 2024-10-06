import { MeetingProvider } from "@videosdk.live/react-sdk";
import Room from "./Room";
import { useLocation } from "react-router-dom";
import { DEV_AUTH } from "../../http/VideoSDK";




export default function RoomWrapper() {

    const location = useLocation();


    return (
        <>
            {
                DEV_AUTH && location.state.roomId && (
                    <MeetingProvider
                        config={{
                            meetingId: location?.state?.roomId,
                            micEnabled: true,
                            webcamEnabled: true,
                            name: location.state.username
                        }}
                        token={DEV_AUTH}
                    >
                        <Room/>
                    </MeetingProvider>
                )
            }
        </>
    )
}