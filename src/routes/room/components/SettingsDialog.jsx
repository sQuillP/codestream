import { 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    Stack,
    Button,
    DialogContentText,
    TextField,
    
} from "@mui/material";
import { useState } from "react";




export default function SettingsDialog({
    open,
    onClose,
    updateSettings
}) {

    const [codeSettings, setCodeSettings] = useState({
        fontSize: 16,
        tabSize: 4 //default
    })


    function handleChange(key, value) {
        setCodeSettings({...codeSettings, [key]:value});
    }

    function onSaveChanges() {
        updateSettings(codeSettings);
        onClose();
    }

    return (
        <Dialog
            fullWidth
            open={open}
            onClose={onClose}
        >
            <DialogTitle mb={3} sx={{borderBottom:'3px solid var(--bg-4)'}} borderColor={'lightgray'} border={'medium'} fontFamily={'inherit'}>
                Code Settings
            </DialogTitle>
            <DialogContent>
                <Stack pb={4} borderBottom={'1px solid var(--bg-4)'} width={'100%'} direction={'row'} justifyContent={'space-between'}>
                    <div>
                        <DialogContentText 
                            color="white" 
                            fontFamily={'inherit'}
                            fontSize={'18px'}
                        >Font Size</DialogContentText>
                        <DialogContentText mt={1} variant="caption">
                            Changes the editor's font size in pixels.
                        </DialogContentText>
                    </div>
                    
                    <TextField
                        value={codeSettings.fontSize}
                        onChange={e=> handleChange('fontSize',e.target.value)}
                        type="number"
                        variant="standard"
                    />
                </Stack>
                <Stack mt={3} mb={3} width={'100%'} justifyContent={'space-between'} direction={'row'}>
                    <div>
                        <DialogContentText 
                            color="white" 
                            fontFamily={'inherit'}
                            fontSize={'18px'}
                        >Tab Space</DialogContentText>
                        <DialogContentText mt={1} variant='caption'>
                            Change the default tab space of the editor.
                        </DialogContentText>
                    </div>
                    <TextField
                        variant="standard"
                        value={codeSettings.tabSize}
                        onChange={e => handleChange('tabSize', e.target.value)}
                        type="number"
                        
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    color="success"
                    sx={{textTransform:'none'}}
                    onClick={onSaveChanges}
                >
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    )
}