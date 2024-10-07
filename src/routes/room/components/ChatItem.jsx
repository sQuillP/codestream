import "../css/ChatItem.css";
import { Typography } from "@mui/material";




function ChatItem({
    message,
    myId
}) {

    return (
        <div 
            className="chat-item-container"
            style={{
                width:'100%',
                display:'flex',
                justifyContent: message.senderName === 'me' ? 'flex-end':'flex-start',
                boxSizing:'border-box'
            }}
        >
            {
                (()=> {
                    if(message.senderName !== 'me') {
                        return (
                            <div className="ci-chat-item" style={{display:'inline-block', }}>
                                <Typography color="white" fontFamily={'inherit'} variant='subtitle2'>
                                    {message.senderName}
                                </Typography>
                                <div className="chat-box">
                                    <p className="text ci-message">{message.message}</p>
                                </div>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div className="ci-chat-item" style={{display:'inline-block' }}>
                                <Typography color="white" textAlign={'right'} fontFamily={'inherit'} variant='subtitle2'>
                                    You
                                </Typography>
                                <div className="chat-box" style={{marginLeft: 'auto'}}>
                                    <p className="text ci-message">{message.message}</p>
                                </div>
                            </div>
                        )
                    }
                })()
            }
        </div>
    )
}


export default ChatItem;