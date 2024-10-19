import "./css/Room.css";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Editor from '@monaco-editor/react';
import {Stack, IconButton, Tooltip, Button, Snackbar, Alert, CircularProgress, useMediaQuery} from '@mui/material';

import { useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import { Buffer } from "buffer";

//api
import { judge0, Judge0_languages } from "../../http/Judge0";

//components
import SettingsDialog from "./components/SettingsDialog";
import JoinScreen from "./components/JoinScreen";
import Navbar from "./components/Navbar";
import ParticipantView from "./components/ParticipantView";
import VideoTrack from "./components/VideoTrack";
import TabScreen from "./components/TabsScreen";
import ChooseLanguage from "./components/ChooseLanguage";


//config
import languages from "./config/languages";
import {EDITOR, LANGUAGE, SUBMITTING_STATUS, SUBMISSION_RESULT} from "../../http/Channels";


//icons
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';


const SUBMITTING = 'submitting';
const NOT_SUBMITTING = 'not-submitting';

export default function Room({refreshToken}) {

    const {state} = useLocation();
    const editorRef = useRef();

    //UI state for dragging windows
    const [horizontalWidth, setHorizontalWidth] = useState(600);
    const [horizontalMouseDown, setHorizontalMouseDown] = useState(false);
    const [verticalMouseDown, setVerticalMouseDown] = useState(false);
    const [verticalHeight, setVerticalHeight] = useState(500);


    const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
    const [errorSnackbar, setErrorSnackbar] = useState(false);
    const [joiningRoom, setJoiningRoom] = useState(false);

    //Editor state 
    const [language, setLanguage] = useState("python");
    const [editorSettings, setEditorSettings] = useState({
        fontSize: '16px',
        tabSize: 2

    })
    const lconfig = languages[language];

    const [editorValue, setEditorValue] = useState(lconfig.defaultValue);
    const [syncedEditor, setSyncedEditor] = useState(false);

    const [submittingCode, setSubmittingCode] = useState(false);
    const [terminalContent, setTerminalContent] = useState("Output will appear here.");

    function onEditorChanged(editorState) {
        if(editorState === editorValue){
            return;
        }
        // for extra details{editorContent: editorState}
        setEditorValue(editorState);
        publish(editorState ,null,{language});

    }

    function onEditorReset() {
        // editorRef.current.setValue(lconfig.defaultValue)
        setEditorValue(lconfig.defaultValue)
        publish(lconfig.defaultValue, null, {language});
    }



    //videoSDK stream state
    const [joined, setJoined] = useState(false);


    const [mainViewerId, setMainViewerId] = useState(null);


    // username, roomId
    const { join, participants, localParticipant} = useMeeting({

        onParticipantJoined:(p)=> {
            setMainViewerId(p.id);
        },
        onMeetingJoined:()=> {
            setJoiningRoom(false);
            setJoined(true);
        },
        onMeetingLeft:()=> {
            setJoined(false);
        },

        onError:(e)=> {
            console.log("WTF something went wrong");
            console.log(e);
        },

        onSpeakerChanged: (speakerId) => {
            if(!speakerId) return;
            setMainViewerId(speakerId);
        },
        
    });


    function getCurrentUser() {
        if(participants.has(mainViewerId) === false) {
            return localParticipant.id;
        } else {
            return mainViewerId
        }
    }


    const { publish } = usePubSub(EDITOR, {
        onMessageReceived: (message)=> {
            if(message.payload.language !== language) {
                setLanguage(message.payload.language);
            }
            setEditorValue(message.message);
        }
    });

    const languagePubSub = usePubSub(LANGUAGE, {
        onMessageReceived: (message)=> {
            setLanguage(message.message);
        }
    });



    const submissionPubSub = usePubSub(SUBMITTING_STATUS, {
        onMessageReceived: (message)=> {
            if(message.message === SUBMITTING) {
                setSubmittingCode(true);
            } else {
                setSubmittingCode(false);
            }
        }
    });


    const submissionResultPubSub = usePubSub(SUBMISSION_RESULT, {
        onMessageReceived:(message)=> {
            setTerminalContent(message.message);
        }
    });



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
        setEditorValue(languages[e.target.value].defaultValue);
        languagePubSub.publish(e.target.value,null,null);
    }

    function handleSwitch(viewerid) {
        // setMainViewerId(viewerid);
    }

    function joinRoom() {
        join();
    }


    useEffect(()=> {
        submissionResultPubSub.publish(terminalContent,null,null);
    },[terminalContent]);


    async function onSubmitCode() {
        try {
            // setSubmittingCode(true);
            submissionPubSub.publish(SUBMITTING, null, null);
            const source_codeb64 = Buffer.from(editorValue).toString('base64');
            console.log('submitted body', { 
                source_code:source_codeb64,
                stdin: null,//might change this later
                language_id: Judge0_languages[lconfig.language]
            })
            const judge0_response = await judge0.post('/judge0',{ 
                source_code:source_codeb64,
                stdin: null,//might change this later
                language_id: Judge0_languages[lconfig.language]
            });
            console.log('raw judge0 response', judge0_response.data)
            const {stderr, stdout, compile_output} = judge0_response.data.data;

            const judge0_output = stdout || compile_output;
            const judge0_stderr = Buffer.from((stderr || ""), 'base64').toString("ascii");
            const decodedBase64 = Buffer.from((judge0_output||""),'base64').toString('ascii') + '\n'+judge0_stderr;
            setTerminalContent(decodedBase64);

            // setTimeout(()=> {
            //     setSubmittingCode(false);
            //     submissionPubSub.publish(NOT_SUBMITTING, null, null);
            // },3000);
        } catch(error) {
            console.log("Error submitting code", error);
        } finally {
            setSubmittingCode(false);
            submissionPubSub.publish(NOT_SUBMITTING,null,null);
        }

    }


    console.log("in room:::participants", participants);

    return (
        <>
            <Snackbar
                open={errorSnackbar}
                onClose={()=> setErrorSnackbar(false)}
                anchorOrigin={{vertical:'bottom', horizontal:'center'}}
            >
                <Alert
                    variant="filled"
                    sx={{width:'100%'}} 
                    severity="error" >NOTICE: Looks like there are issues connecting to the chat room. Room ID might be incorrect.</Alert>
            </Snackbar>
            <SettingsDialog
                open={openSettingsDialog}
                onClose={()=> setOpenSettingsDialog(false)}
                updateSettings={(settings)=> setEditorSettings(settings)}    
            />
            <Navbar refreshToken={refreshToken} joined={joined}/>
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
                                            title={submittingCode ? "Running": "Execute"}
                                        >
                                            <div>
                                                <Button
                                                    endIcon={submittingCode === false ? <DirectionsRunRoundedIcon/>: <></>}
                                                    sx={{textTransform:'none',}}
                                                    variant="contained"
                                                    color="success"
                                                    disabled={joined === false || submittingCode}
                                                    onClick={onSubmitCode}
                                                    
                                                >
                                                    {submittingCode ? <CircularProgress size={'1rem'}/> : "Run Code"}
                                                </Button>
                                            </div>
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
                                value={editorValue}
                                defaultLanguage={lconfig.language}
                                defaultValue={lconfig.defaultValue}
                                onChange={onEditorChanged}
                                options={{
                                    fontSize: `${editorSettings.fontSize}px`,
                                    tabSize: editorSettings.tabSize,
                                    detectIndentation: true,
                                    // automaticLayout:false
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
                            joined === true && participants ? (
                                <ParticipantView
                                    height={'100%'}
                                    width={'100%'}
                                    participantId={localParticipant.id}
                                    onClick={()=> null}
                                />
                            ) : (
                                <JoinScreen joiningRoom={joiningRoom} join={joinRoom}/>
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
                    <TabScreen terminalContent={terminalContent}/>
                </div>
            </div>
        </>
    )

}
