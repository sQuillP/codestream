import { IconButton, Stack, Button } from "@mui/material";
import "../css/Chat.css";
import { memo, useState } from "react";
import SendIcon from '@mui/icons-material/Send';



export default memo(function Chat() {

    const [chatMessage, setChatMessage] = useState('');
    const [currentKey, setCurrentKey] = useState("");

    // let boxes = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    let boxes = []

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



    return (
        <>
            <div className="stream-chat-container">
                <div className="chat-stream-text">
                    {
                        (()=> {
                            if(boxes.length !== 0) {
                                return (
                                    boxes.map((b,i) => {
                                        return (
                                            <div
                                                key={i}
                                                style={{
                                                    height: '50px',
                                                    width:'50px',
                                                    margin:'10px 0',
                                                    background:'red'
                                                }}
                                            >
                                            </div>
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
                >
                    Send
                </Button>
            </Stack>
        </>
    )
});