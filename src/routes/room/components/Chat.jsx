import { Stack, Button } from "@mui/material";
import "../css/Chat.css";
import { memo, useEffect, useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';


import ChatItem from "./ChatItem";



function Chat({
    messages,
    publish,
    meetingDetails
}) {

    const [chatMessage, setChatMessage] = useState('');
    const [currentKey, setCurrentKey] = useState("");
    const scrollRef = useRef();



 
    function handleKeyEnter(e) {
        setCurrentKey(e.key);
        if(e.key === 'Enter' && currentKey !== 'Shift') {
            onSendMessage();
        }
    }

    function onSendMessage() {
        publish(chatMessage,{persist: true}, null);
        setChatMessage("");
    }


    useEffect(()=> {
        scrollRef.current?.scrollIntoView();
    },[messages]);

    return (
        <>
            <div className="stream-chat-container">
                <div className="chat-stream-text">
                    {
                        (()=> {
                            if(messages.length !== 0 && meetingDetails.localParticipant?.id) {
                                return (
                                    messages.map((message,i) => {
                                        return (
                                            <ChatItem
                                                key={message.timestamp}
                                                message={message}
                                                myId={meetingDetails.localParticipant.id}
                                            />
                                        )
                                    })
                                )
                            } else {
                                return (
                                    <Stack height={'100%'} justifyContent={'center'} alignItems={'center'}>
                                        <p className="text">Messages will appear here in this window. </p>
                                    </Stack>
                                )
                            }
                        })()
                    }
                    <div style={{marginTop:'20px'}} ref={scrollRef}/>
                </div>
            </div>
            <Stack  margin={'10px 0'} width={'100%'} gap={1} direction={'row'}>
                <textarea 
                    className="chat-footer"
                    value={chatMessage}
                    rows={2}
                    placeholder="Type to chat..."
                    onChange={(e)=> setChatMessage(e.target.value)}
                    onKeyDown={handleKeyEnter}
                />
                <Button
                    endIcon={<SendIcon/>}
                    variant="contained"
                    sx={{textTransform:'none'}}
                    onClick={onSendMessage}
                >
                    Send
                </Button>
            </Stack>
        </>
    )
}

export default memo(Chat);