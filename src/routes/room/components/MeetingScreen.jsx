import { memo, useState } from "react";

import VideoGrid from "./VideoGrid";
import VideoTrack from "./VideoTrack";

function MeetingScreen({
    participants
}) {
    
    const [displayMode, setDisplayMode] = useState('grid');

    
    return (
        <div className="meeting-screen-container">
            {/* Do this later */}
            <div className="view-options-container"></div>
            {
                (()=> {
                    if(displayMode === 'grid') {
                        return (
                            <VideoGrid
                                participants={participants}
                            />
                        )
                    } else if(displayMode === 'track') {
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