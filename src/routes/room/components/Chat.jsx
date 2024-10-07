import { IconButton, Stack, Button } from "@mui/material";
import "../css/Chat.css";
import { memo, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import ChatItem from "./ChatItem";
import { CHAT } from "../../../http/Channels";



const dummy_messages = [
    {senderName:'foo', message:'some very long message and string im very sorry.', senderId: new Date().getTime().toString()},
    {senderName:'foo', message:'some very long message and string im very sorry.', senderId: new Date().getTime().toString()},
    {senderName:'me', message:'some very long message and string im very sorry.', senderId: new Date().getTime().toString()},
    {senderName:'foo', message:'some very long message and string im very sorry.', senderId: new Date().getTime().toString()},
    {senderName:'foo', message:'some very long message and string im very sorry.', senderId: new Date().getTime().toString()},
    {senderName:'foo', message:'some very long message and string im very sorry. this is yet another long message, you have failed the interview!', senderId: new Date().getTime().toString()},
    {senderName:'me', message:'some very long message and string im very sorry.', senderId: new Date().getTime().toString()},
    {senderName:'foo', message:'some very long message and string im very sorry.', senderId: new Date().getTime().toString()},
    {senderName:'me', message:'some very long message and string im very sorry. how long can this be? It needs to be as long as can be....', senderId: new Date().getTime().toString()},
    {senderName:'foo', message:'some very long message and string im very sorry.', senderId: new Date().getTime().toString()},
];

function Chat() {

    const [chatMessage, setChatMessage] = useState('');
    const [currentKey, setCurrentKey] = useState("");

    const meetingDetails = useMeeting();

    const [videoChat, setVideoChat] = useState([]);

    console.log(meetingDetails);

    let boxes = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    // let boxes = []

    function handleSubmit() {

    }
 
    function handleKeyEnter(e) {
        console.log(e.key)
        setCurrentKey(e.key);
        if(e.key === 'Enter' && currentKey !== 'Shift') {
            handleSubmit();
            return;
        }
    }


    function onMessageReceived(message) {
        const updatedMessages = [...videoChat, message];
        setVideoChat(updatedMessages);
    }

    function onOldMessagesReceived(oldMessages) {
        const updatedMessages = [...oldMessages];
        setVideoChat(updatedMessages);
    }

    const { publish, messages } = usePubSub(CHAT, {
        onMessageReceived,
        onOldMessagesReceived,
      });


    function onSendMessage() {
        try {
            publish(chatMessage,{persist: true}, null);
            setChatMessage("");
        } catch(error) {
            console.log("unable to show any messages");
        }
    }

    return (
        <>
            <div className="stream-chat-container">
                <div className="chat-stream-text">
                    {
                        (()=> {
                            if(boxes.length !== 0) {
                                return (
                                    dummy_messages.map((message,i) => {
                                        return (
                                            <ChatItem
                                                message={message}
                                                myId={meetingDetails.localParticipant}
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
                </div>
            </div>
            <Stack minWidth={'500px'} margin={'10px 0'} width={'100%'} gap={1} direction={'row'}>
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
                    onClick={()=> onSendMessage()}
                >
                    Send
                </Button>
            </Stack>
        </>
    )
}

export default memo(Chat);