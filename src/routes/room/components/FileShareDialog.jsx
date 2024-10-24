import "../css/FileShareDialog.css";
import { Button, CustomTabPanel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tab, Tabs, Stack, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Buffer } from "buffer";

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { CheckCircle, CheckCircleRounded } from "@mui/icons-material";

import { useFile } from "@videosdk.live/react-sdk";

const SHARED_FILES  = 0;
const UPLOAD_FILE = 1;



const dummy_files = [
    {name:"My_resume.pdf"},
    {name:"My-degree.pdf"},
    {name: 'my-gpa.pdf'},
    // {name:"My_rewsume.pdf"},
    // {name:"My-degweree.pdf"},
    // {name: 'my-gpwea.pdf'},
    // {name:"My_resumwe.pdf"},
    // {name:"My-degreee.pdf"},
    // {name: 'my-gpaq.pdf'}
];


export default function FileShareDialog({
    sharedFiles=[],
    joined,
    open,
    onClose,
    videoSDKToken,
    publish,
    handleUseFileAction
}) {


    const [currentTab, setCurrentTab] = useState(0);
    const [filesToUpload, setFilesToUpload] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadingBase64File, setUploadingBase64File] = useState(false);
    const { uploadBase64File, fetchBase64File } = useFile();
    const [snackbarError, setSnackbarError] = useState("");

    const chooseFileRef = useRef();


    function handleTabChange(e, newValue) {
        setCurrentTab(newValue);
    }

    function onSelectDownloadFile(selectedFile, index) {
        if(index !== -1 ) {
            const updatedList = selectedFiles.filter((file, i)=> file.name !== selectedFile.name);
            setSelectedFiles(updatedList);
        } else {
            setSelectedFiles([...selectedFiles, selectedFile]);
        }
    }

    function fileToDataURL(file) {
        const fileReader = new FileReader();
        return new Promise((resolve, reject)=> {
            fileReader.onload = function(e) {
                const reEncodedb64 = Buffer.from(e.target.result).toString('base64');
                resolve(reEncodedb64);
            }
            fileReader.readAsDataURL(file);
        });

    }

    
    async function showFile(e) { 
        e.preventDefault() 
        const files = Array.prototype.slice.call(e.target.files);
        const convertedFiles = await Promise.all(files.map(fileToDataURL));
        const mappedConvertedFiles = convertedFiles.map((convertedFile, i)=> {
            return {
                name:files[i].name,
                b64: convertedFile
            }
        });
        setFilesToUpload(mappedConvertedFiles);
    } 





    useEffect(()=> {
        setFilesToUpload([]);
        setSelectedFiles([]);
        if(chooseFileRef.current?.value){
            chooseFileRef.current.value = "";
        }
    },[open, currentTab])

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
        >
            <DialogTitle>
                File Share
            </DialogTitle>
            <DialogContent>

                {/* <DialogContentText>Some content text</DialogContentText> */}
                <Tabs 
                    value={currentTab}
                    onChange={handleTabChange}
                >
                    <Tab label={"Shared Files"} />
                    <Tab label="Upload File"/>
                </Tabs>

                {
                    (()=> {
                        if(currentTab === SHARED_FILES){
                            return (
                                <div style={{marginTop:'30px'}} className="file-col-container">
                                { 
                                    sharedFiles.length > 0 ? (
                                        sharedFiles.map((file, i) => {
                                            let index = -1;
                                            for(let i = 0; i<selectedFiles.length; i++) {
                                                if(selectedFiles[i].name === file.name) {
                                                    index = i;
                                                    break;
                                                }
                                            }

                                            return (
                                                <div 
                                                    style={{backgroundColor: index === -1 ? '#393939':'var(--bg-2)'}} 
                                                    onClick={()=> onSelectDownloadFile(file, index)} 
                                                    className="file-col" 
                                                    key={`${file.name}-${i}`}
                                                >
                                                    <Stack justifyContent={'space-between'} alignItems={'center'} direction={'row'}>
                                                        <DialogContentText padding={'3px'} fontFamily={'inherit'}>
                                                            {file.name}
                                                        </DialogContentText>
                                                        {
                                                            index !== -1 && (
                                                                <CheckCircleRoundedIcon color="success"/>
                                                            )
                                                        }
                                                    </Stack>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <Stack height={'100%'} justifyContent={'center'} alignItems={'center'}>
                                            <DialogContentText fontFamily={'inherit'}>
                                                No files have been shared.
                                            </DialogContentText>
                                        </Stack>
                                    )
                                }
                                </div>
                            )
                        } else if(currentTab === UPLOAD_FILE) {
                            return (
                                <div className="file-col-container">
                                    <Stack 
                                        direction='column' 
                                        justifyContent={'center'} 
                                        alignItems={'center'} 
                                        height={'90%'}
                                        gap={3}
                                    >
                                        <DialogContentText textAlign={'center'} mt={3}>
                                            Choose file(s) to share with the group
                                        </DialogContentText>
                                        <div className="files-list-container">
                                            {
                                                filesToUpload.map(uploadFile => {
                                                    return (
                                                        <div key={uploadFile.name} className="fsd-file-upload-row">
                                                            <DialogContentText fontFamily={'inherit'} variant='subtitle2' m={0} p={0}>{uploadFile.name}</DialogContentText>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <label htmlFor="upload-textfile">
                                            <input
                                                multiple
                                                style={{ display: 'none' }}
                                                id="upload-textfile"
                                                name="upload-textfile"
                                                type="file"
                                                onChange={showFile}
                                                ref={chooseFileRef}
                                            />
                                            <Button
                                                sx={{background:'var(--bg-2)', color:'white'}}
                                                variant="contained" 
                                                component="span"
                                            >
                                                Choose File
                                            </Button>
                                        </label>
                                    </Stack>
                                </div>
                            )
                        }
                    })()
                }
            </DialogContent>
            <DialogActions>
                <Button 
                    sx={{textTransform: 'none'}}
                    variant="contained"
                    color="success"
                    onClick={()=> handleUseFileAction(currentTab, filesToUpload, selectedFiles)}
                >
                    {currentTab === SHARED_FILES ? "Download":"Upload Files"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}