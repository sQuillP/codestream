import { useParticipant } from "@videosdk.live/react-sdk";
import { memo, useEffect, useMemo, useRef } from "react";
import ReactPlayer from 'react-player';


function ParticipantView({
    participantId
}) {
    const micRef = useRef(null);

    const {webcamStream, micStream, webCamOn, micOn, isLocal, displayName} = useParticipant(participantId);

    const videoStream = useMemo(()=> {
        if(webCamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    },[webcamStream, webCamOn]);

    useEffect(()=> {
        if(!!micRef.current === false) { return; }
        if(micOn && micStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(micStream.track);
            micRef.current.srcObject = mediaStream;
            micRef.current.play().catch(error=> {
                console.error("videoelem.current.play has failed",error);
            })
        } else {
            micRef.current.srcObject = null;
        }
    },[micStream, micOn]);

    return (
        <div className="participant-view-container">
            <ReactPlayer
                playsinline //!!!!
                pip={false}
                light={false}
                controls={false}
                muted={true}
                url={videoStream}
                height={'300px'}
                width={'300px'}
                onError={(error)=> {
                    console.log(err,"participant video error!!! wtf!")
                }}
            />   
        </div>
    )
}


export default ParticipantView;

