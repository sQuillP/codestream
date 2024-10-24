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
    Snackbar,
    Alert,
} from "@mui/material"


import { Buffer } from "buffer";

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
import { useParams } from "react-router-dom";

import { FILESHARE_PUBSUB } from "../../../http/Channels";





const SHARED_FILES  = 0;
const UPLOAD_FILE = 1;


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
    const [openFileShareSnackbar, setOpenFileShareSnackbar] = useState(false);
    

    const [sharedFileData, setSharedFileData] = useState([]);

    const { uploadBase64File, fetchBase64File } = useFile();

    const navigate = useNavigate();
    const params = useParams();


    function onCopyToClipBoard() {
        navigator.clipboard.writeText(params.roomId);
        setCopyMessage("Copied!")
    }

    const fileSharePubSub = usePubSub(FILESHARE_PUBSUB, {
        onMessageReceived: (message)=> {
            console.log(sharedFileData);
            setSharedFileData((fd)=> [...fd, {url: message.message, name: message.payload.name}]);
            setOpenFileShareSnackbar(true);
        },
        onOldMessagesReceived: (messages)=> {
            const transformedMessages = messages.map(m => {return {url: m.message, name: m.payload.name}});
            setSharedFileData(transformedMessages);
        }
    });



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


    // This will download a text file. 
    function downloadBase64File(base64, fileName) {
        const link = document.createElement('a');
        link.href = base64;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    async function handleUseFileAction(currentTab,filesToUpload, selectedFiles) {
        //No action should be taken if user is not joined.
        setOpenFileShareDialog(false);
        if(joined === false) {return;}
        try {
            if(currentTab === UPLOAD_FILE) {
                // const uploadURLS = [];
                for(let i = 0; i<filesToUpload.length; i++) {
                    const url = await uploadBase64File({
                        base64Data: filesToUpload[i].b64, 
                        token:videoSDKToken, 
                        fileName: filesToUpload[i].name
                    });
                    // uploadURLS.push(url);
                    fileSharePubSub.publish(url, {persist: true}, {name:filesToUpload[i].name});
                }
            } else if(currentTab === SHARED_FILES) {
                for( let i = 0; i < selectedFiles.length; i++) {
                    const encodedb64Data = await fetchBase64File({url: selectedFiles[i].url, token:videoSDKToken});
                    const decodedButStillB64Data = Buffer.from(encodedb64Data,'base64').toString('ascii')
                    downloadBase64File(decodedButStillB64Data,selectedFiles[i].name)
                }
            }

            //notify that everything is finished.
        }catch(error) {
            console.log("Just notify of an error");
        }
    }

    /**
     * TODO:
     * meeting id, mute, video, settings, and end
     */
    return (
        <>
            <Snackbar
                open={openFileShareSnackbar}
                onClose={()=> setOpenFileShareSnackbar(false)}
                autoHideDuration={3000}
                anchorOrigin={{vertical:"bottom", horizontal:'center'}}
            >
                <Alert sx={{width:'100%'}} variant="filled" severity="success">
                    Notice: a file has been shared!
                </Alert>
            </Snackbar>
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
                sharedFiles={sharedFileData}
                onClose={()=> setOpenFileShareDialog(false)}
                videoSDKToken={videoSDKToken}
                publish={fileSharePubSub.publish}
                joined={joined}
                handleUseFileAction={handleUseFileAction}
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