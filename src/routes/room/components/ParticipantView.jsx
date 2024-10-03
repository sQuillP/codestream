import { Box } from "@mui/material";
import "../css/ParticipantView.css";

import { useParticipant,  } from "@videosdk.live/react-sdk";
import { useRef, useEffect, useMemo, useState,  } from "react";
import ReactPlayer from "react-player";




//Participant chat window.
export default function ParticipantView(props) {
    const micRef = useRef(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
      useParticipant(props.participantId);
    console.log({webcamStream, micStream, webcamOn, micOn, isLocal, displayName})

    const [calcWidth, setCalcWidth] = useState(0);

    const videoStream = useMemo(() => {
      if (webcamOn && webcamStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(webcamStream.track);
        return mediaStream;
      }
    }, [webcamStream, webcamOn]);

   

    useEffect(() => {
      if (micRef.current) {
        if (micOn && micStream) {
          const mediaStream = new MediaStream();
          mediaStream.addTrack(micStream.track);
  
          micRef.current.srcObject = mediaStream;
          micRef.current
            .play()
            .catch((error) =>
              console.error("videoElem.current.play() failed", error)
            );
        } else {
          micRef.current.srcObject = null;
        }
      }
    }, [micStream, micOn]);
  
    return (
      <Box 
          className="pv-container">
        <audio ref={micRef} autoPlay playsInline muted={isLocal} />
        {webcamOn && (
          <ReactPlayer
            //
            playsinline // extremely crucial prop
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            height={'100%'}
            width={'100%'}
            url={videoStream}
            onError={(err) => {
              console.log(err, "participant video error");
            }}
          />
        )}
        <div className="pv-footer">
            <p className="text">{displayName}</p>
        </div>
      </Box>
    );
  }