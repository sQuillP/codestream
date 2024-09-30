import { MenuItem,
    FormControl,
    Select,
    InputLabel
 } from "@mui/material";





export default function ChooseLanguage({
    value, 
    onChange
}) {


    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="choose-language">Language</InputLabel>
            <Select
                labelId="choose-language"
                id="demo-simple-select-standard"
                value={value}
                onChange={onChange}
            >
            <MenuItem value={"javascript"}>JavaScript</MenuItem>
            <MenuItem value={'python'}>Python</MenuItem>
            <MenuItem value={'java'}>Java</MenuItem>
            <MenuItem value={"c#"}>C#</MenuItem>
            <MenuItem value={"c++"}>C++</MenuItem>
            <MenuItem value={"c"}>C</MenuItem>

            </Select>
      </FormControl>
    )
}