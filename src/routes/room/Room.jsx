import "./css/Room.css";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Editor from '@monaco-editor/react';
import {Stack, IconButton, Tooltip, Button} from '@mui/material';


//components
import HorizontalTab from "./components/HorizontalTab";
import Terminal from "./components/Terminal";
import Chat from "./components/Chat";
import SettingsDialog from "./components/SettingsDialog";

//config
import languages from "./config/languages";
import {EDITOR, LANGUAGE} from "../../http/Channels";


//icons
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import ChooseLanguage from "./components/ChooseLanguage";
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import { useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import Navbar from "./components/Navbar";
import ParticipantView from "./components/ParticipantView";
import VideoTrack from "./components/VideoTrack";




export default function Room() {

    const {state} = useLocation();
    const editorRef = useRef();


    //UI state for dragging windows
    const [horizontalWidth, setHorizontalWidth] = useState(600);
    const [horizontalMouseDown, setHorizontalMouseDown] = useState(false);
    const [verticalMouseDown, setVerticalMouseDown] = useState(false);
    const [verticalHeight, setVerticalHeight] = useState(500);


    const [openSettingsDialog, setOpenSettingsDialog] = useState(false);

    //Editor state
    const [language, setLanguage] = useState("python");
    const [editorSettings, setEditorSettings] = useState({
        fontSize: '16px',
        tabSize: 2

    })
    const lconfig = languages[language];

    const [editorValue, setEditorValue] = useState(lconfig.defaultValue);
    const [syncedEditor, setSyncedEditor] = useState(false);



    function onEditorChanged(editorState) {
        if(editorState === editorValue){
            return;
        }
        // for extra details{editorContent: editorState}
        setEditorValue(editorState);
        publish(editorState ,null,null);

    }

    function onEditorReset() {
        // editorRef.current.setValue(lconfig.defaultValue)
        // publish(editorRef.current.getValue(), null, null);
    }


    //Either terminal or chat
    const [selectedTab, setSelectedTab] = useState("terminal");

    const [terminalContent, setTerminalContent] = useState('Output will appear in this terminal.');


    //videoSDK stream state
    const [joined, setJoined] = useState(false);

    const [mainViewerId, setMainViewerId] = useState(null);


    // username, roomId
    const { join, participants, localParticipant} = useMeeting({

        onParticipantJoined:(p)=> {
            setMainViewerId(p.id);
        },
        onMeetingJoined:()=> {
            setJoined(true);
        },
        onMeetingLeft:()=> {
        },

        onSpeakerChanged: (speakerId) => {
            setMainViewerId(speakerId);
        }
    });

    console.log(participants)



    const { publish } = usePubSub(EDITOR, {
        onMessageReceived: (message)=> {
            setEditorValue(message.message);
        }
    });

    const languagePubSub = usePubSub(LANGUAGE, {
        onMessageReceived: (message)=> {
            setLanguage(message.message);
        }
    })


    function editorDidMount(editor, monaco) {
        editorRef.current = editor;
    }


    function onMouseUp(e) {
        setHorizontalMouseDown(false);
        setVerticalMouseDown(false);
    }


    function onMouseMove(e) {
        if(horizontalMouseDown === true) {
            setHorizontalWidth(e.pageX);
        }
        if(verticalMouseDown === true) {
            //navbar height in vh units. currently set to 8vh in the css file.
            const navbarHeight = window.innerHeight * (8 / 100);
            //track height in pixels
            const trackHeight= 125;
            //total offset to subtract from
            const totalOffset = navbarHeight + trackHeight;
            setVerticalHeight(e.pageY - totalOffset);
        }
    }


    function onHorizontalMouseDown(e) {
        setHorizontalMouseDown(true);
        e.preventDefault();
    }

    function onVerticalMouseDown(e) {
        setVerticalMouseDown(true);
        e.preventDefault();
    }


    function onChangeLanguage(e) {
        if(e.target.value === language) return;
        setLanguage(e.target.value);
        languagePubSub.publish(e.target.value,null,null);

    }

    function handleSwitch(viewerid) {
        setMainViewerId(viewerid);
    }


    return (
        <>
            
            <SettingsDialog
                open={openSettingsDialog}
                onClose={()=> setOpenSettingsDialog(false)}
                updateSettings={(settings)=> setEditorSettings(settings)}    
            />
            <Navbar/>
            <div 
                className="devroom-container"
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
            >
                <div className="devroom-horizontal-wrapper">
                    <div 
                        className="editor-wrapper"
                        style={{width: `${horizontalWidth}px`}}
                    >
                        <div className="editor-content">

                            <div className="editor-header">
                                <Stack
                                    flexDirection={'row'}
                                    justifyContent={'space-between'}
                                >
                                    <ChooseLanguage
                                        onChange={onChangeLanguage}
                                        value={language}
                                    />
                                    <Stack direction={'row'} alignItems={'center'} gap={2}>
                                        <Tooltip title="Code Settings">
                                            <IconButton
                                                onClick={()=> setOpenSettingsDialog(true)}
                                            >
                                                <SettingsRoundedIcon/>
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip
                                            title="Reset Code"
                                        >
                                            <IconButton
                                                onClick={onEditorReset}
                                            >
                                                <ReplayRoundedIcon/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip
                                            title="Execute"
                                        >
                                            <Button
                                                endIcon={<DirectionsRunRoundedIcon/>}
                                                sx={{textTransform:'none',}}
                                                variant="contained"
                                                color="success"
                                            >
                                                Run Code
                                            </Button>
                                        </Tooltip>
                                        <Button
                                                onClick={join}
                                            >
                                                debug
                                            </Button>
                                    </Stack>
                                    
                                </Stack>
                            </div>
                            <Editor
                                height={'100vh'}
                                onMount={editorDidMount}
                                theme="vs-dark"
                                width={'100%'}
                                path={lconfig.path}
                                value={editorValue}
                                defaultLanguage={lconfig.language}
                                defaultValue={lconfig.defaultValue}
                                onChange={onEditorChanged}
                                options={{
                                    fontSize: `${editorSettings.fontSize}px`,
                                    tabSize: editorSettings.tabSize,
                                    detectIndentation: true
                                }}
                            />
                            </div>

                    </div>
                    <div 
                        onMouseDown={onHorizontalMouseDown}
                        className="resize">
                        <svg
                            className="icon"
                            viewBox="0 0 16 16"
                            fill="#FFFFFF"
                        >
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
                        </svg>
                    </div>
                </div>
                <div className="devroom-right-col">
                    <div 
                        className="devroom-cam-container"
                        style={{height: `${verticalHeight}px` }}
                    >
                        {
                            joined && participants && (
                                <ParticipantView
                                    height={'100%'}
                                    width={'100%'}
                                    participantId={!mainViewerId ? [...participants.keys()][0] : mainViewerId}
                                    onClick={()=> null}
                                />
                            )
                        }
                    </div>
                    <VideoTrack 
                        participants={participants}
                        joined={joined}
                        onClick={handleSwitch}
                        activeSpeaker={mainViewerId}
                    />
                    <div className="resize-horizontal"onMouseDown={onVerticalMouseDown}></div>
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
                                            <Chat/>
                                        )
                                    }
                                })()
                            }

                    </div>
                </div>
            </div>
        </>
    )

}
