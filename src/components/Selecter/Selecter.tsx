import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FC} from 'react'

type PropsType = {
    statesList:string[];
    value:string;
    StateSeter: (props:string)=>void;
    label:string;
    size?:"small" | "medium";
    width?:number;
    name?:string;
}

export const Selecter:FC<PropsType> = ({statesList, value, StateSeter,  label, size, width, name}) => {
    var elCount:number = -1;

    return (
        <FormControl sx={{ m: 1, minWidth: width ? width : 120 }} size={size ? size : "small"}>
            <InputLabel id="demo-select-small-label">{label}</InputLabel>
            <Select
                name={name ? name : 'selecter'}
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={value}
                label={label}
                onChange={(e) => StateSeter(e.target.value)}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {statesList.map(e => {
                    elCount += 1;
                    return <MenuItem key={e} value={e}>{e}</MenuItem>
                })}
            </Select>
        </FormControl>
    )
}
