import { Stack } from "@mui/material";
import { useState, memo } from "react";
import { usePubSub } from "@videosdk.live/react-sdk";

import { CHAT } from "../../../http/Channels";

import Terminal from "./Terminal";
import HorizontalTab from "./HorizontalTab";
import Chat from "./Chat";

function TabScreen() {

    const [selectedTab, setSelectedTab] = useState('terminal');
    const [terminalContent, setTerminalContent] = useState("Output will appear here.")
    const [videoChat, setVideoChat] = useState([]);

    function onOldMessagesReceived(oldMessages) {
        console.log('old messages', oldMessages);
        const updatedMessages = [...oldMessages];
        setVideoChat(updatedMessages);
    }

    function onMessageReceived(message) {
        console.log('message received', message);
        setVideoChat(prev => [...prev, message]);   
    }

    const { publish } = usePubSub(CHAT, {
        onMessageReceived,
        onOldMessagesReceived,
    });


    return (
        <div 
            className="tab-section"
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
                                />
                            )
                        }
                    })()
                }
            </div>
    )

}


export default TabScreen;