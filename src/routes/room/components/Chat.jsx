import "../css/Chat.css";
import { memo, useState } from "react";

export default memo(function Chat() {

    const [chatMessage, setChatMessage] = useState('');

    return (
        <div className="stream-chat-container">
            <div className="chat-stream-text">

            </div>
            <textarea 
                className="chat-footer"
                value={chatMessage}
                onChange={(e)=> setChatMessage(e.target.value)}
            />
        </div>
    )
});