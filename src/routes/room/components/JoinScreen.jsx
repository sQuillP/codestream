import "../css/JoinScreen.css";
import { Typography, CircularProgress } from "@mui/material";




function JoinScreen({
    join,
    joiningRoom
}) {


    return (
        <div className="js-join-screen">
            <div className="js-join-screen-content">
                <Typography color="white" variant='h5' fontFamily={'inherit'}>Meeting has not started yet</Typography>
                <button
                    className="js-join-btn"
                    onClick={join}
                >
                    {joiningRoom === true ? <CircularProgress size={'1rem'} color="white"/>:"Join Meeting"}
                </button>
            </div>
            
        </div>
    )
}



export default JoinScreen;