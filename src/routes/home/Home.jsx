import "./css/Home.css";
import { Link, useNavigate } from "react-router-dom";

import JoinRoomDialog from "./components/JoinRoomDialog";
import { useState } from "react";

//icons
import MeetingRoomIcon from '@mui/icons-material/MeetingRoomRounded';
import AddCircle from '@mui/icons-material/AddCircleOutlineRounded';
import GitHubIcon from '@mui/icons-material/GitHub';


//component
import { IconButton, Tooltip, Stack } from "@mui/material";


export default function Home() {

    const [openJoinRoomDialog, setOpenJoinRoomDialog] = useState(false);
    const navigate = useNavigate();

    const[createNewMeeting, setCreateNewMeeting] = useState(false);

    
    function onCloseJoinRoomDialog() {
        setOpenJoinRoomDialog(false);   
    }



    function onSubmitRoomDetails({username, roomId}) {
        navigate("/rooms/"+roomId,{state:{username}});
    }





    return (
        <div className="home-container">
            <JoinRoomDialog
                open={openJoinRoomDialog}
                onClose={onCloseJoinRoomDialog}
                onSubmitRoomDetails={onSubmitRoomDetails}
                createNewMeeting={createNewMeeting}
            />
           
            <div className="home-content">
                <h1 className="text home-header">Devstreamer Does it All</h1>
                <p className="home-action text">Bringing powerful tools like live chat, filesharing, code editing, and submissions!</p>
                <div className="button-container">
                    <button
                        className="home-button"
                        onClick={()=> { setCreateNewMeeting(true); setOpenJoinRoomDialog(true)}}
                    >
                        Create Room
                        <AddCircle sx={{marginLeft:'10px'}}/>
                    </button>
                    <button
                        className="home-button"
                        onClick={()=> setOpenJoinRoomDialog(true)}
                    >
                        Join Existing Room
                        <MeetingRoomIcon sx={{marginLeft: '10px'}}/>
                    </button>
                    <Stack sx={{marginTop:'20px'}} direction={'row'} justifyContent={'center'}>
                        <Link target="_blank" rel="noopener noreferrer" to={"https://github.com/sQuillP/codestream"}>
                            <Tooltip title="View GitHub">
                                <IconButton sx={{background: 'var(--bg-3)'}} size='large'>
                                    <GitHubIcon/>
                                </IconButton>
                            </Tooltip>
                        </Link>
                    </Stack>
                </div>
                
            </div>
        </div>
    )
}