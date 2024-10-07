
import "../css/VideoTrack.css";
import ParticipantView from "./ParticipantView"
import {memo} from 'react'


function  VideoTrack({
    participants,
    joined,
    onClick,
    activeSpeaker
}) {
    /**
     * {
            "id": "6dxp4feo",
            "displayName": "will",
            "streams": {},
            "quality": "low",
            "local": true,
            "pinState": {
                "cam": false,
                "share": false
            },
            "webcamOn": true,
            "micOn": true,
            "mode": "CONFERENCE",
            "eventEmitter": {
                "_events": {
                    "stream-enabled": [
                        null,
                        null,
                        null
                    ],
                    "stream-disabled": [
                        null,
                        null,
                        null
                    ],
                    "media-status-changed": [
                        null,
                        null
                    ],
                    "video-quality-changed": [
                        null,
                        null
                    ]
                },
                "_eventsCount": 4
            }
        }
     */
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
                                    extraStyles={{
                                        marginRight:'10px', 
                                        flex:'0 0 auto',
                                        boxSizing:"border-box",
                                        border: activeSpeaker === pid ? '3px solid lightblue':'unset'
                                    }}
                                />
                            )
                        })
                    )   
                }
            </div>
        </div>
    )
}

export default memo(VideoTrack);