import "./css/Home.css";
import { useNavigate } from "react-router-dom";

import JoinRoomDialog from "./components/JoinRoomDialog";
import { useState } from "react";

//icons
import MeetingRoomIcon from '@mui/icons-material/MeetingRoomRounded';
import AddCircle from '@mui/icons-material/AddCircleOutlineRounded';

//component
import CodeStreak from "./components/CodeStreak";


export default function Home() {

    const [openJoinRoomDialog, setOpenJoinRoomDialog] = useState(false);
    const navigate = useNavigate();
    // const bubbles = new Array(30).fill(0)

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
            {/* <div className="bubbles">
                {
                    bubbles.map((_,i)=> {
                        return <CodeStreak key={`${i}`}/>
                    })
                }
            </div> */}
            <div className="home-content">
                <h1 className="text home-header">Codestreamer Does it All</h1>
                <p className="home-action text">Providing powerful tools like live chat,code editing and submissions, and so much more!</p>
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
                </div>
            </div>
        </div>
    )
}