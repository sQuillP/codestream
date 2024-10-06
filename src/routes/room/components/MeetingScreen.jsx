import { memo, useState } from "react";

import VideoGrid from "./VideoGrid";
import VideoTrack from "./VideoTrack";

function MeetingScreen({
    participants,
    joined
}) {
    
    const [displayMode, setDisplayMode] = useState('track');
 
    
    return (
        <div style={{height:'100%', width:'100%', boxSizing:'border-box'}} className="meeting-screen-container">
            {/* Do this later */}
            <div style={{position:'relative'}} className="view-options-container"></div>
            {
                (()=> {
                    if(displayMode === 'grid' && joined === true) {
                        return (
                            <VideoGrid
                                participants={participants}
                            />
                        )
                    } else if(displayMode === 'track' && joined === true) {
                        return (
                            <VideoTrack
                                participants={participants}
                            />
                        )
                    }
                })()
            }
        </div>
    )
}

export default memo(MeetingScreen);