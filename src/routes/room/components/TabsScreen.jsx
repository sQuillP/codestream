import { Stack } from "@mui/material";
import { useState } from "react";
import { useMeeting, usePubSub } from "@videosdk.live/react-sdk";

import { CHAT } from "../../../http/Channels";

import Terminal from "./Terminal";
import HorizontalTab from "./HorizontalTab";
import Chat from "./Chat";

function TabScreen({
    terminalContent
}) {

    const meetingDetails = useMeeting();

    const [selectedTab, setSelectedTab] = useState('terminal');
    const [videoChat, setVideoChat] = useState([]);


    const notification = new Audio("/notification.mp3");


    function onMessageReceived(message) {
        setVideoChat(prev => [...prev, message]);
        if(message.senderId !== meetingDetails.localParticipant.id){
            notification.play();   
        }
    }

    const { publish } = usePubSub(CHAT, {
        onMessageReceived,
    });



    return (
        <div 
            className="tab-section"
            style={{overflowX:'hidden'}}
        >
            <Stack
                direction={'row'}
                width={"100%"}
                style={{background:'var(--bg-1)'}}
            >
                <HorizontalTab
                    title={"Terminal"}
                    onClick={()=> setSelectedTab('terminal')}
                    active={selectedTab==='terminal'}
                />
                <HorizontalTab
                    title={"Chat"}
                    active={selectedTab === 'chat'}
                    onClick={()=> setSelectedTab('chat')}
                />
            </Stack>
                {
                    (()=> {
                        if(selectedTab === 'terminal') {
                            return (
                                <Terminal
                                    textContent={terminalContent}
                                />
                            );
                        } else if(selectedTab === 'chat') {
                            return (
                                <Chat
                                    publish={publish}
                                    messages={videoChat}
                                    meetingDetails={meetingDetails}
                                />
                            )
                        }
                    })()
                }
            </div>
    )

}


export default TabScreen;