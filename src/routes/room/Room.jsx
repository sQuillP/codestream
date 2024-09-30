import "./css/Room.css";
import { useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import Editor from '@monaco-editor/react';
import {Stack, IconButton, Tooltip, Button} from '@mui/material';

//components
import HorizontalTab from "./components/HorizontalTab";
import Terminal from "./components/Terminal";
import Chat from "./components/Chat";
import SettingsDialog from "./components/SettingsDialog";

//config
import languages from "./config/languages";


//icons
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import ChooseLanguage from "./components/ChooseLanguage";
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import { MeetingProvider } from "@videosdk.live/react-sdk";
import Navbar from "./components/Navbar";

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

    console.log('selected language', language)

    //Either terminal or chat
    const [selectedTab, setSelectedTab] = useState("terminal");



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
            setVerticalHeight(e.pageY);
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
        setLanguage(e.target.value);
    }


    return (
        <MeetingProvider
            config={{
                meetingId:'abc123',
                micEnabled: true,
                webcamEnabled: true,
                name:"C.J Wilikers"
            }}
            token="abc123"
        >
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
                                                onClick={()=> editorRef.current.setValue(lconfig.defaultValue)}
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
                                    </Stack>
                                    
                                </Stack>
                            </div>
                            <Editor
                                height={'100vh'}
                                onMount={editorDidMount}
                                theme="vs-dark"
                                width={'100%'}
                                path={lconfig.path}
                                defaultLanguage={lconfig.language}
                                defaultValue={lconfig.defaultValue}
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
                        style={{height: `${verticalHeight}px`}}
                    >
                        <p className="text">Camera goes here</p>
                    </div>
                    <div 
                        className="tab-section"
                    >
                        <div className="resize-horizontal"onMouseDown={onVerticalMouseDown}></div>
                        <Stack
                            direction={'row'}
                            width={"100%"}
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
                                                textContent={'Terminal....'}
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
        </MeetingProvider>
    )

}
