import { memo, useState } from "react";

import VideoGrid from "./VideoGrid";
import VideoTrack from "./VideoTrack";

function MeetingScreen({
    participants,
    joined
}) {
    
    const [displayMode, setDisplayMode] = useState('grid');

    
    return (
        <div className="meeting-screen-container">
            {/* Do this later */}
            <div className="view-options-container"></div>
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