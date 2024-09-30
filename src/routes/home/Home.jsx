import "./css/Home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoomRounded';
import AddCircle from '@mui/icons-material/AddCircleOutlineRounded';
import JoinRoomDialog from "./components/JoinRoomDialog";




export default function Home() {

    const [openJoinRoomDialog, setOpenJoinRoomDialog] = useState(false);
    const navigate = useNavigate();
    const bubbles = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    
    function onCloseJoinRoomDialog() {
        setOpenJoinRoomDialog(false);
    }


    function onSubmitRoomDetails({username, roomId}) {
        navigate("/rooms/"+roomId,{state:{username, roomId}});
    }



    return (
        <div className="home-container">
            <JoinRoomDialog
                open={openJoinRoomDialog}
                onClose={onCloseJoinRoomDialog}
                onSubmitRoomDetails={onSubmitRoomDetails}
            />
            <div className="bubbles">
                {
                    bubbles.map((_,i)=> {
                        return <span key={i} style={{"--i":+String(Math.floor(Math.random()*29)+ 2)}}></span>
                    })
                }
            </div>
            <div className="home-content">
                <h1 className="text home-header">Codestreamer Does it All</h1>
                <p className="home-action text">Providing powerful tools like live chat,code editing and submissions, and so much more!</p>
                <div className="button-container">
                    <button
                        className="home-button"
                        onClick={()=> null}
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