import "../css/VideoGrid.css";


import ParticipantView from "./ParticipantView"
import { useEffect, useState } from "react";
import { useRef } from "react";


/**
 * @description: this component needs some work.
 * I can't do video layout for the life of me...
 */
export default function VideoGrid({
    participants
}) {

    const vgRef = useRef();
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);



    const gridContainerStyles = {
        // display:'grid',
        // gridTemplateRows:'',
        // gridTemplateColumns:'',
        display:'flex',
        boxSizing:'border-box',
        padding:'5px',
        gap:'5px',
        height:'100%',
        width:'100%',
        position:'absolute',
        top:'0',
        left: '0',
        overflowY:'auto',
        background:'orange',
    }

    useEffect(()=> {
        console.log("resizing content");
        if(!vgRef.current) {
            return;
        } 

        setHeight(vgRef.current.clientHeight/participants.length);
        setWidth(vgRef.current.clientWidth/participants.length);

    },[participants])

    return (
        participants && (
        <div 
            className="video-grid-container"
            ref={vgRef}
            style={{
                ...gridContainerStyles,
                background:'purple',
            }}
        >
            {
                [...participants.keys()].map(participantId => {
                    return (
                        <ParticipantView
                            key={participantId}
                            participantId={participantId}
                            height={`${height}px`}
                            width={`${width}px`}
                        />
                    )
                })
            }
        </div>
        )
    )
}