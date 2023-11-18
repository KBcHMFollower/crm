import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {Paper} from '@mui/material'
import { FC} from 'react'

type PropsType = {
    statesList:string[];
    stateName:string;
    value:string;
    label:string;
    size?:"small" | "medium";
    width?:number;
    name?:string;
    updateble:boolean;
    onChange: (stateName:string, newValue:string)=>void;
}

export const ProfileSelector:FC<PropsType> = ({updateble, statesList, stateName, value, label, size, width, name, onChange}) => {

    return (
        <Paper sx={{ width: '300px', display: 'flex', gap:1, justifyContent: 'space-between', padding: 1, alignItems:'center' }} elevation={4}>
        <FormControl sx={{ m: 1, minWidth: width ? width : 120 }} size={size ? size : "small"}>
            <InputLabel id="demo-select-small-label">{label}</InputLabel>
            <Select
                sx={{backgroundColor:'white'}}
                name={name ? name : 'selecter'}
                labelId="demo-select-small-label"
                id="demo-select-small"
                disabled = {!updateble}
                value={value}
                label={label}
                onChange={(e) => onChange(stateName, e.target.value)}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {statesList.map(e => {
                    return <MenuItem key={e} value={e}>{e}</MenuItem>
                })}
            </Select>
        </FormControl>
        </Paper>
    )
}
