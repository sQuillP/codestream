import "./css/Room.css";
import { useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import Editor from '@monaco-editor/react';
import {Stack} from '@mui/material';
import HorizontalTab from "./components/HorizontalTab";
import Terminal from "./components/Terminal";
import Chat from "./components/Chat";

export default function Room() {

    const {state} = useLocation();
    const editorRef = useRef();

    //UI state
    const [horizontalWidth, setHorizontalWidth] = useState(400);
    const [horizontalMouseDown, setHorizontalMouseDown] = useState(false);
    const [verticalMouseDown, setVerticalMouseDown] = useState(false);
    const [verticalHeight, setVerticalHeight] = useState(500);


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
            console.log('setting horizontal width', e.pageX);
            setHorizontalWidth(e.pageX);
        }

        if(verticalMouseDown === true) {
            console.log('setting height to ', e.pageY);
            console.log('client y', e.clientY)
            setVerticalHeight(e.pageY)
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


    return (
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
                    <Editor
                        height={'100vh'}
                        onMount={editorDidMount}
                        theme="vs-dark"
                        width={'100%'}
                        language="python"
                        options={{
                            fontSize:'16px'
                        }}
                    />
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
                        style={{borderBottom:'1px solid var(--bg-2)'}}
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
    )

}
