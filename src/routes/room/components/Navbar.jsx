import { 
    IconButton, 
    Tooltip,
    Stack,
} from "@mui/material"

import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';



export default function Navbar() {

    /**
     * TODO:
     * meeting id, mute, video, settings, and end
     */
    const meetingId = "abc-123"
    return (
        <div className="navbar-container">
            <Stack>
                <div className="room-id-container">
                    <p className="text">Meeting ID: {meetingId}</p>
                    <Tooltip>
                        <IconButton size="small">
                            <ContentCopyRoundedIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            </Stack>
        </div>
    )
}