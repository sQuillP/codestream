import "../css/JoinRoomDialog.css";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";

const MAX_NAME_LENGTH = 25;

export default function JoinRoomDialog({
    open,
    onClose,
    onSubmitRoomDetails
}) {

    const [username, setUsername] = useState("");
    const [roomId, setRoomId] = useState("");


    function disableJoin() {
        if(username.trim().length > MAX_NAME_LENGTH) {
            return true;
        }
        if(username.trim() === "" || roomId.trim() === "") {
            return true;
        }
        return false;
    }


    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
        >
            <DialogTitle fontSize={'2rem'} fontFamily={'inherit'}>
                Join Existing Room
            </DialogTitle>
            <DialogContent>
                <DialogContentText fontFamily={'inherit'} color="white">
                    Please provide a username and a Room ID before joining
                </DialogContentText>
                <div className="jr-input-row">
                    <label htmlFor="">Enter Your Name <span className="required">*</span></label>
                    <input 
                        type="text" 
                        onChange={e => setUsername(e.target.value)}
                        className="jr-input"
                    />
                </div>
                <div className="jr-input-row">
                    <label htmlFor=""> Enter Room ID <span className="required">*</span></label>
                    <input 
                        type="text" 
                        className="jr-input"
                        onChange={e => setRoomId(e.target.value)}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{textTransform:'unset'}}
                    variant="outlined"
                    color="error"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    sx={{textTransform:'unset'}}
                    variant='outlined'
                    disabled={disableJoin()}
                    onClick={()=> onSubmitRoomDetails({username, roomId})}
                >Join</Button>
            </DialogActions>
        </Dialog>
    )
}