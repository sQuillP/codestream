import { Avatar, Box } from "@mui/material";
import "../css/ParticipantView.css";

import { useParticipant,  } from "@videosdk.live/react-sdk";
import { useRef, useEffect, useMemo, useState, memo } from "react";
import ReactPlayer from "react-player";




//Participant chat window.
export default memo(function ParticipantView(props) {
    const micRef = useRef(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
      useParticipant(props.participantId);
    // console.log({webcamStream, micStream, webcamOn, micOn, isLocal, displayName})

    const [calcWidth, setCalcWidth] = useState(0);

    const videoStream = useMemo(() => {
      if (webcamOn && webcamStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(webcamStream.track);
        return mediaStream;
      }
    }, [webcamStream, webcamOn]);


    function generateInitials() {
      if (!displayName) return "AB";
      const splitName = displayName.trim().split(/\s+/gi);
      if(splitName.length === 1) {
        return splitName[0].substring(0,2);
      } else {
        return splitName[0][0] + splitName[1][0]
      }
    }
   

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
      <div 
        className="pv-container"
        style={{height: props.height, width: props.width, ...props.extraStyles}}
        onClick={()=> props.onClick(props.participantId)}
      >
        <audio ref={micRef} autoPlay playsInline muted={isLocal} />
        {webcamOn ? (
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
        ): (
          <Box height={'100%'} width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Avatar sx={{height:'50px', width:'50px'}}>
              {generateInitials()}
            </Avatar>
          </Box>
        )}
        <div className="pv-footer">
            <p className="text">{displayName}</p>
        </div>
      </div>
    );
  });