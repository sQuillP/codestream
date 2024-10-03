import "../css/VideoGrid.css";


import ParticipantView from "./ParticipantView"

export default function VideoGrid({
    participants
}) {

    console.log('participants', participants);
    return (
        participants && (
        <div className="video-grid-container">
            {
                [...participants.keys()].map(participantId => {
                    return (
                        <ParticipantView
                            key={participantId}
                            participantId={participantId}
                        />
                    )
                })
            }
        </div>
        )
    )
}