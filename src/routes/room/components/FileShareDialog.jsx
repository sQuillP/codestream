import { Button, CustomTabPanel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tab, Tabs } from "@mui/material";
import { useState } from "react";


const SHARED_FILES  = 0;
const UPLOAD_FILE = 1;

export default function FileShareDialog({
    files,
    onDownloadFile,
    onUploadFile,
    open,
    onClose
}) {


    const [currentTab, setCurrentTab] = useState(0);


    function handleTabChange(e, newValue) {
        setCurrentTab(newValue);
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
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
                            return files.map(fileURL => {
                                <div className="file-col">
                                    
                                </div>
                            })
                        } else if(currentTab === UPLOAD_FILE) {
                            return (

                            )
                        }
                    })()
                }
            </DialogContent>
            <DialogActions>
                <Button>
                    Download
                </Button>
            </DialogActions>
        </Dialog>
    )
}