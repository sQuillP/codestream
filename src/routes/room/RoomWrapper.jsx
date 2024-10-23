import { MeetingProvider } from "@videosdk.live/react-sdk";
import Room from "./Room";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { getVideoSDKToken } from "../../http/VideoSDK";
import { 
    CircularProgress, 
    Typography, 
    Box, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    DialogContentText,
    Button,
} from "@mui/material";

import { VideoSDKTokenContext } from "../../App";


export default function RoomWrapper() {

    const location = useLocation();

    const navigate = useNavigate();

    const params = useParams();

    console.log("PARAMS", params);

    // const {videoSDKToken, setVideoSDKToken} = useContext(VideoSDKTokenContext);
    const [videoSDKToken, setVideoSDKToken] = useState(null);

    const [fetchingToken, setFetchingToken] = useState(false);


    const [tokenError, setTokenError] = useState(false);

    const callAndSetVideoSDKToken = useCallback( async ()=> {
        try {
            setFetchingToken(true);
            const token = await getVideoSDKToken();
            setVideoSDKToken(token);
        } catch(error) {
            console.error(error.message);
            setTokenError(true);
            setVideoSDKToken(null);
        } finally {
            setFetchingToken(false);
        }
    },[]);


    async function onRetry() {
        setTokenError(false);
        await callAndSetVideoSDKToken();
    }

    //Only needs to be run once since one token is required
    useEffect(()=> {
        callAndSetVideoSDKToken();
    },[]);

    return (
        <>
            <Dialog
                open={tokenError}
                onClose={()=> null}
                fullWidth
            >
                <DialogTitle fontFamily={'inherit'}>Server Error</DialogTitle>
                <DialogContent>
                    <DialogContentText fontFamily={'inherit'}>Looks like things are not getting setup correctly. Click 'Reconnect' to try again and ensure you're connected to the internet.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        onClick={()=> navigate('/')}
                        color="error"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={onRetry}
                    >
                        Reconnect
                    </Button>
                    
                </DialogActions>

            </Dialog>
            {
                fetchingToken === false && videoSDKToken !== null && params.roomId ? (
                    <MeetingProvider
                        config={{
                            meetingId: params.roomId,
                            micEnabled: true,
                            webcamEnabled: true,
                            name: location.state?.username || "Unknown User"
                        }}
                        token={videoSDKToken}
                    >
                        <Room videoSDKToken={videoSDKToken} refreshToken={callAndSetVideoSDKToken}/>
                    </MeetingProvider>
                ): (
                    <div 
                        style={{
                            color:'white', 
                            height:'100vh', 
                            width:'100%',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center'
                        }}>
                        <Box textAlign={'center'}>
                            <Typography
                                style={{
                                    "background": "-webkit-linear-gradient(0deg, #ff4f40 0%, #f4d 99.99%)",  
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                                mb={3} 
                                variant="h2" 
                                fontFamily={'inherit'}
                            >
                                One moment please
                            </Typography>
                            <CircularProgress color="white" size='3rem'/>
                            <Typography mt={2} fontFamily={'inherit'}>Establishing new connection...</Typography>
                        </Box>
                    </div>
                )
            }
        </>
    )
}