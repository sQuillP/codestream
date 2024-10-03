import "../css/LoadingRoom.css";



import { CircularProgress } from "@mui/material"


export default function LoadingRoom() {


    return (
        <div className="loading-room-container">
            <div>
                <CircularProgress size={'large'}/>
                <p className="text">Loading room details please wait.</p>
            </div>
        </div>
    )
}