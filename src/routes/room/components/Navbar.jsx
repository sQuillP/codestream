import "../css/Navbar.css";
import { 
    IconButton, 
    Tooltip,
    Stack,
    useMediaQuery,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
} from "@mui/material"


import FileShareDialog from "./FileShareDialog";

//some icons
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import MicOffRoundedIcon from '@mui/icons-material/MicOffRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import VideocamOffRoundedIcon from '@mui/icons-material/VideocamOffRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import CallEndRoundedIcon from '@mui/icons-material/CallEndRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';


import { useNavigate } from "react-router-dom";

import { useState, memo } from "react";
import { useMeeting, usePubSub, useFile } from "@videosdk.live/react-sdk";
import { useLocation, useParams } from "react-router-dom";

import { FILESHARE_PUBSUB } from "../../../http/Channels";

function Navbar({
    joined,
    refreshToken,
    videoSDKToken
}) {

    const {
        toggleMic, 
        toggleWebcam, 
        localMicOn, 
        localWebcamOn, 
        meetingId,
        leave,
    } = useMeeting();

    const smallScreen = useMediaQuery("(max-width: 810px)");
    const [copyMessage, setCopyMessage] = useState("Copy room ID");
    const [enableVideo, setEnableVideo] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);
    const [openFileShareDialog, setOpenFileShareDialog] = useState(false);
    

    const [fileURLs, setFileURLs] = useState([]);
    const { uploadBase64File, fetchBase64File } = useFile();

    const navigate = useNavigate();
    const params = useParams();


    function onCopyToClipBoard() {
        navigator.clipboard.writeText(params.roomId);
        setCopyMessage("Copied!")
    }


    const fileSharePubSub = usePubSub(FILESHARE_PUBSUB, {
        onMessageReceived: (message)=> {
            setFileURLs([...fileURLs, message.message]);
        },
        onOldMessagesReceived: (messages)=> {
            const transformedMessages = messages.map(m => m.message);
            setFileURLs(transformedMessages);
        }
    });


    async function onSendFile() {
        try {
            const base64Data = "base64data";
            const fileName = 'filename';

            const fileURL = await uploadBase64File({base64Data, token: videoSDKToken, fileName});
            fileSharePubSub.publish(fileURL,)
        } catch(error) {

        }
    }


    async function onDownloadFile() {
        try {
            const url = "url";
            const b64FileContents = await fetchBase64File({url, token:videoSDKToken});


        } catch(error) {

        }
    }


    function onEndCall() {
        leave();
        refreshToken();
    }

    function onCloseSettings() {
        setOpenSettings(false);
    }


    function onNavigateBack() {
        leave();
        navigate('/');
    }

    /**
     * TODO:
     * meeting id, mute, video, settings, and end
     */
    return (
        <>
            <Dialog
                open={openSettings}
                onClose={onCloseSettings}
                fullWidth
            >
                <DialogTitle fontFamily={'inherit'}>
                    Settings
                </DialogTitle>
                <DialogContent>
                    {/* Put more crap here. */}
                    <div>
                        <Typography mb={2} fontFamily={'inherit'} variant='subtitle2' color="white">
                                Meeting ID
                        </Typography>
                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                        >
                            <Typography fontFamily={'inherit'} variant='body1' color="white">
                                {params.roomId}
                            </Typography>
                            <Tooltip title={copyMessage}>
                                <IconButton 
                                    onClick={onCopyToClipBoard}
                                >
                                    <ContentCopyRoundedIcon/>
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </div>
                </DialogContent>
                <DialogActions sx={{mt: 3}}>
                    <Button
                        variant='contained'
                        color="error"
                        onClick={onCloseSettings}
                        sx={{textTransform:'unset'}}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <FileShareDialog
                open={openFileShareDialog}
                onClose={()=> setOpenFileShareDialog(false)}
            />
            <div className="navbar-container">
                <Stack height={'100%'} direction='row' alignItems={'center'} justifyContent={"space-between"}>
                    {
                        smallScreen === false ? (
                        <>
                            <div onClick={onNavigateBack} role="button">
                                <h1 className="text room-logo">Devstreamer</h1>
                            </div>
                            <Stack 
                            flexDirection={'row'} 
                            justifyContent={'flex-start'} 
                            alignItems={'center'}
                            gap={1}
                            >
                                <p className="text">Meeting ID: {params.roomId}</p>
                                <Tooltip onMouseEnter={()=> setCopyMessage('Copy room ID')} title={copyMessage}>
                                    <IconButton 
                                        onClick={onCopyToClipBoard}
                                    size="small">
                                        <ContentCopyRoundedIcon/>
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        </>

                        ): (
                            <Tooltip title="Home">
                                <IconButton onClick={onNavigateBack}>
                                        <ArrowBackIcon/>
                                </IconButton>
                            </Tooltip>
                        )
                    }
                    <Stack
                        alignItems={'center'}
                        justifyContent={'center'}
                        direction={'row'}
                        gap={3}
                    >
                        <Tooltip title="Share Files">
                            <IconButton 
                                onClick={()=> setOpenFileShareDialog(true)}
                                size="large"
                            >
                                <FileUploadRoundedIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title={localMicOn === false ? "Unmute":"Mute"}
                        >
                            <IconButton
                                size="large"
                                onClick={()=> toggleMic()}
                            >
                                {
                                    localMicOn === false ? <MicOffRoundedIcon/> : <MicRoundedIcon/>
                                }
                            </IconButton>
                        </Tooltip>
                    
                        <Tooltip
                            title={enableVideo ? "Disable Video Share":"Share video"}
                        >
                            <IconButton
                                size="large"

                                onClick={(e) => toggleWebcam()}
                            >
                                {
                                    localWebcamOn===false ? <VideocamOffRoundedIcon/> : <VideocamRoundedIcon/>
                                }
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title={"Call Settings"}
                        >
                            <IconButton
                                onClick={()=> setOpenSettings(true)}
                                size="large"

                            >
                                <TuneRoundedIcon/>
                            </IconButton>
                        </Tooltip>
                        {
                            joined && (
                                <Tooltip title={"End call"}>
                                    <IconButton
                                        sx={{background:'red', "&:hover":{'background':'darkred'}}}
                                        onClick={onEndCall}
                                        size="large">
                                        <CallEndRoundedIcon/>
                                    </IconButton>
                                </Tooltip>
                            )
                        }
                    </Stack>
                </Stack>
            </div>
        </>
    )
}

export default memo(Navbar);