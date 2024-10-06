
import "../css/VideoTrack.css";
import ParticipantView from "./ParticipantView"
import {memo} from 'react'


export default memo(function  VideoTrack({
    participants,
    joined,
    onClick
}) {

    return (
        <div className="video-gallerybox">
            <div className="video-gallery">
                {
                    joined && participants && (
                        [...participants.keys()].map(pid => {
                            return (
                                <ParticipantView 
                                    height="100%" 
                                    width={'200px'} 
                                    key={pid} 
                                    participantId={pid}
                                    onClick={onClick}
                                    extraStyles={{marginRight:'10px', flex:'0 0 auto'}}
                                />
                            )
                        })
                    )   
                }
            </div>
        </div>
    )
});